// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract IcoCocay is Initializable, AccessControlUpgradeable, UUPSUpgradeable, OwnableUpgradeable {
    IERC20 public USDT;
    IERC20 public CocayToken;
    address public CocayWallet;
    address public AiSolvesAddress;
    address public feeWallet;
    bytes32 constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    //Para front end
    uint256 public cantVendidos;
    //Cant por vender es el balance de este contrato con los tokens Cocay
    uint256 public cantInv;
    uint256 public cantHolders;
    //Certificado en otro contrato

    struct Compra { //NUEVO
        uint256 cantidad;
        uint256 timestamp;
        uint256 rep;
    }

    struct Recibo { //NUEVO
        address comprador;
        uint256 cantidad;
        uint256 porcentaje;
        uint256 rep;
    }

    struct Arbol { //NUEVO
        address invitado;
        address referido;
        uint256 compra;
        uint256 porcentaje;
        uint256 ganancia;
        string codRef;
        uint256 rep;
    }

    mapping(string => address) public sponsorCodes;
    mapping(address => string) public sponsorCodesOfWallet; //NUEVO
    mapping(address => bool) public haveSponsorCode;
    mapping(address => address) public parent;
    mapping(address => uint256) public amountRefferal;
    mapping(address => Compra[]) public compras; //NUEVO
    mapping(address => Recibo[]) public recibos; //NUEVO
    mapping(address => uint256) public porcentaje; //NUEVO
    mapping(address => mapping(address => uint256)) public porcentajeAcordado;
    Arbol[] public arbol; //NUEVO

    function initialize(address _usdtAddress, address _cocayAddress, address _cocayWallet, address _aiSolvesAddress) public initializer {
        __AccessControl_init();
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        _grantRole(ADMIN_ROLE, msg.sender);

        USDT = IERC20(_usdtAddress);
        CocayToken = IERC20(_cocayAddress);
        CocayWallet = _cocayWallet;
        AiSolvesAddress = _aiSolvesAddress;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}


    function addSponsor(string memory _name, address _refferal, uint256 _amount) public {
        if(msg.sender != AiSolvesAddress){
            require(haveSponsorCode[msg.sender], "Requiere un codigo de referidos");
        }
        require(sponsorCodes[_name] == address(0), "Codigo ya tomado");
        require(_refferal != address(0), "No puede ser 0x000");
        require(haveSponsorCode[_refferal] != true, "Ya tiene codigo de referidos, solicita que genere otra wallet");
        require(_amount >= 10 && _amount <= 100, "El porcentaje debe ser mayor a 1% y menor a 10%");
        require(_refferal != msg.sender);

        parent[_refferal] = msg.sender; //Setea el padre como el que lo invito
        haveSponsorCode[_refferal] = true; //Le pone true en que tieen codigo refeido
        sponsorCodes[_name] = _refferal; //Le setea a ese codigo referid esa wallet
        sponsorCodesOfWallet[_refferal] = _name; //NUEVO
        
        porcentaje[_refferal] = _amount;
        porcentajeAcordado[msg.sender][_refferal] = _amount;
        if(msg.sender != AiSolvesAddress){
            require(_amount <= porcentaje[msg.sender], "El porcentaje a dar debe ser menor o igual al que tiene disponible");
          //  porcentaje[msg.sender] = porcentaje[msg.sender] - _amount;
        }
    }

    function buyCocays(uint256 _amount, string memory _sponsorCode) public { //Compra 1.000.0000
      uint256 total = _amount + ((_amount * 120)/1000); //Total que se va a ir enviando
         if (keccak256(abi.encodePacked(_sponsorCode)) != keccak256(abi.encodePacked(""))) {
            total = (total * 900) / 1000; //Si el codigo es diferente a "" (es deicir tiene codigo) se le hace el 10% de descuento 1.008.000
        }
      require(USDT.transferFrom(msg.sender,CocayWallet, (total * 800) / 1000), "USDT transfer failed"); //Envia el 80% a Cocay     806.400 BIEN
      require(USDT.transferFrom(msg.sender,AiSolvesAddress, (total * 100) / 1000), "USDT transfer failed"); //Envia el 10% a AiSolves  100.800 BIEN
    Compra memory nuevaCompra = Compra({ //NUEVO
        cantidad: _amount,
        timestamp: block.timestamp,
        rep: compras[msg.sender].length + 1
    });
    compras[msg.sender].push(nuevaCompra); //NUEVO

    Arbol memory nuevaRelacion = Arbol({ //NUEVO
            invitado: msg.sender,
            referido: sponsorCodes[_sponsorCode],
            compra: _amount,
            porcentaje: amountRefferal[sponsorCodes[_sponsorCode]],
            ganancia: (_amount * amountRefferal[sponsorCodes[_sponsorCode]]) / 1000,
            codRef: _sponsorCode,
            rep: arbol.length + 1
        });
    arbol.push(nuevaRelacion); //NUEVO

      cantInv += total;
      if(CocayToken.balanceOf(msg.sender) == 0){
        cantHolders++;
      }
      address nextRefferal = sponsorCodes[_sponsorCode]; //Agarra el sponsor desde el parametro
      uint256 porcentajes;
      address walletPrev;
      for (uint256 i = 0; i <= 10; i++) {
        porcentajes += porcentaje[nextRefferal] - porcentajeAcordado[nextRefferal][walletPrev];
        require(porcentajes <= 100, "Error, porcentaje supera 100");
            if(i == 0){
                uint256 porcentajeAcordadoConHijo = porcentaje[nextRefferal];
                uint256 cantidadAEnviar = (total * porcentajeAcordadoConHijo) / 1000;
                require(USDT.transferFrom(msg.sender, nextRefferal, cantidadAEnviar), "USDT transfer failed");
            }else{
                uint256 porcentajeAcordadoConHijo = porcentaje[nextRefferal] - porcentajeAcordado[nextRefferal][walletPrev];
                uint256 cantidadAEnviar = (total * porcentajeAcordadoConHijo) / 1000;
                require(USDT.transferFrom(msg.sender, nextRefferal, cantidadAEnviar), "USDT transfer failed"); //JAVI 60480 BIEN, Jesi 10,080, Luis 10,0080, Pepe 20160 BIEN
            }

            Recibo memory nuevoRecibo = Recibo({ //NUEVO
                 comprador: msg.sender,
                 cantidad: (total * porcentaje[nextRefferal]) / 1000,
                 porcentaje: porcentaje[nextRefferal],
                 rep: recibos[nextRefferal].length + 1
            });
            recibos[nextRefferal].push(nuevoRecibo); //NUEVO
            walletPrev = nextRefferal;
            nextRefferal  = parent[nextRefferal];
                  
            if(nextRefferal == AiSolvesAddress){
                 break;
            }
       }
      require(CocayToken.transfer(msg.sender, _amount), "No se pudo enviar token Cocay");
    }

   function donar(uint256 _cantidad) public {
            require(USDT.transferFrom(msg.sender,CocayWallet, _cantidad), "USDT transfer failed");
    }

    function changeAiSolvesAddress(address _aiSolvesAddress) public onlyRole(ADMIN_ROLE) {
             AiSolvesAddress = _aiSolvesAddress;
    }

    function changeCocayWallet(address _cocayWallet) public onlyRole(ADMIN_ROLE) {
            CocayWallet = _cocayWallet;
    }


}
