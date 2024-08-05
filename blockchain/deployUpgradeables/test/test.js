const { expect } = require('chai');
const { ethers, network, upgrades } = require('hardhat');

// Definimos las variables globales para reutilización en las pruebas
let membershipContract;
let token;
let owner;
let user1;
let user2;
let user3;
let user4;
let user5;
let user6;
let user7;
let user8;
let user9;
let user10;
let user11;
let user12;
let user13;
let user14;
let user15;
let user16;
let user17;
let user18;
let user19;
let user20;
let user21;
let user22;
let user23;
let user24;
let user25;
let user26;
let user27;
let user28;
let user29;
let user30;
let user31;
let user32;
let user33;

// Función para aumentar el tiempo en la red
async function increaseTime(duration) {
  await network.provider.send("evm_increaseTime", [duration]);
  await network.provider.send("evm_mine");
}

// Función para crear signers aleatorios
function randomSigners(amount) {
  const signers = [];
  for (let i = 0; i < amount; i++) {
    signers.push(ethers.Wallet.createRandom());
  }
  return signers;
}

// Inicializamos las variables globales antes de cada prueba
beforeEach(async () => {
  const Token = await ethers.getContractFactory("StoneToken");
  token = await Token.deploy();
  
  const Poi = await ethers.getContractFactory('POI2');
  poi = await Poi.deploy();
  
  const Account = await ethers.getContractFactory("Account");
  account = await Account.deploy();
  
  const MembershipContract3 = await ethers.getContractFactory('MembershipContract3');
  membershipContract3 = await MembershipContract3.deploy();
  
  const Claim = await ethers.getContractFactory('StakingV3');
  claim = await Claim.deploy();
  
  const Treasury = await ethers.getContractFactory('Treasury');
  treasury = await Treasury.deploy();
  
  const signers = await ethers.getSigners();

  // Verificar la longitud del array de signers
  console.log("Número de signers disponibles:", signers.length);

  // Usar los primeros 20 signers de Hardhat y 10 signers aleatorios
  const hardhatSigners = signers.slice(0, 20);
  const randomSignersList = randomSigners(13);

  // Asignar los signers a las variables
  [owner, user1, user2, user3, user4, user5, user6, user7, user8, user9, user10, user11, user12, user13, user14, user15, user16, user17, user18, user19, user20, user21, user22, user23, user24, user25, user26, user27, user28, user29, user30, user31, user32, user33] = [...hardhatSigners, ...randomSignersList];

  // Verificar si user20 está definido
  console.log("user20:", user20 ? user20.address : "undefined");

  // Opcional: si necesitas mostrar direcciones de signers aleatorios
  randomSignersList.forEach((signer, index) => {
    console.log(`Random Signer ${index + 1}: ${signer.address}`);
  });
});



//////////////////////////////////////////////////////
//PRUEBAS CONTRATOS
describe('Prueba MEMBERS general', function () {
  it('PRUEBA GENERAL', async function () {
    //Funcion para inicializar
    async function initializeUsers(users, token, poiAddress, membersAddress, claimAddress) {
      for (const user of users) {
        await token.connect(user).approve(poiAddress, ethers.parseEther("100000000"));
        await token.connect(user).approve(account, ethers.parseEther("100000000"));
        await token.connect(user).approve(membersAddress, ethers.parseEther("100000000"));
        await token.connect(user).approve(claimAddress, ethers.parseEther("1000000000"));
        await token.transfer(user.address, ethers.parseEther("10000")); 
      }
    }


    //Seteo de direccion de contrato
    const tokenAddress = token.getAddress()
    const poiAddress = poi.getAddress()
    const accountAddress = account.getAddress()
    const membersAddress = membershipContract3.getAddress()
    const claimAddress = claim.getAddress()
    const treasuryAddress = treasury.getAddress()

    //Inicializacion
    console.log("Se inicializan los contratos poniendo e POI 30usd como valor y poniendo a user9 en members como defily wallet (Para el sobrante) y en claim lo mismo (Por si la membresia tiene fee)")
    await poi.initialize(accountAddress,membersAddress);
    await account.initialize(tokenAddress,poiAddress,membersAddress,claimAddress,ethers.parseEther('30'));
    await membershipContract3.initialize(tokenAddress,poiAddress,accountAddress,claimAddress,accountAddress);
    await treasury.initialize(tokenAddress);
    await claim.initialize(tokenAddress,treasuryAddress,membersAddress,accountAddress,poiAddress);

    //Se crean 5 membresias 
    console.log("Se crean 5 membresias la primera vale 0 pero tiene 10% de comision, las demas valen de a 1.000 la primera 1.000 la segunda 2.000  y asi...")
    await membershipContract3.createMembership('', 0, 0, 0, 99999,2592000,100,true,100,100);
    await membershipContract3.createMembership('Pay as you go', 0, 0, 99999, 31536000,ethers.parseEther("500"),ethers.parseEther("9999"),true,100,60);
    await membershipContract3.createMembership('Pay as you go +', 0, 0, 99999, 31536000,ethers.parseEther("10000"),ethers.parseEther("100000000"),true,50,50);
    await membershipContract3.createMembership('Basic', ethers.parseEther("100"), 0, 99999, 31536000,ethers.parseEther("200"),ethers.parseEther("1000"),false,0,60);
    await membershipContract3.createMembership('Essential', ethers.parseEther("250"), 0, 99999, 31536000,ethers.parseEther("200"),ethers.parseEther("2500"),false,0,60);
    await membershipContract3.createMembership('Premium', ethers.parseEther("500"), 0, 99999, 31536000,ethers.parseEther("200"),ethers.parseEther("5000"),false,0,60);
    await membershipContract3.createMembership('Professional', ethers.parseEther("1000"), 0, 99999, 31536000,ethers.parseEther("200"),ethers.parseEther("15000"),false,0,50);
    await membershipContract3.createMembership('Ultimate', ethers.parseEther("5000"), 0, 99999, 31536000,ethers.parseEther("200"),ethers.parseEther("100000"),false,0,40);
    await membershipContract3.createMembership('Max', ethers.parseEther("10000"), 0, 99999, 31536000,ethers.parseEther("200"),ethers.parseEther("1000000"),false,0,30);
    
    //Seteos del POI y Membership
    console.log("Se pone al user27 25% y al 28 con 25%")
    await membershipContract3.setPartnerShip(user10.address);

    console.log("Se setea un PartnerShipSplit que podria ser marketing con un 50%% que seria el user12 y al user13 con 50%")
    await account.setAdminWallet(user11.address);

    console.log("Se generan 5 wallets (User2,User3,User4,User5,User6) con la cantidad de usd para luego de comprar se queden en 0 y todos los contratos aprobados.")
    const users = [user1,user2, user3, user4, user5, user6, user4, user5, user6, user7,user8];
    await initializeUsers(users, token,accountAddress, poiAddress, membersAddress, claimAddress);

    console.log("Se registra User1 en el Poi")
    await poi.connect(user1).storeInfo("user1","user1","user1","user1","user1","user1","user1");
    console.log("User1 compra membresia 1 refiriendo a si mismo")
    
    await account.connect(user1).createAccount("Main Account",user1.address,0); //idAccount1 0 //// referidos 3 cuentas y id5 ////LE DA A ID0 20%
    await membershipContract3.connect(user1).buyMembership(1, 0, 0, user1.address, ""); //idAccount1 0 //// referidos 3 cuentas y id5 ////LE DA A ID0 20%
    


    await poi.connect(user2).storeInfo("user2","user2","user2","user2","user2","user2","user2");
    await account.connect(user2).createAccount("Main Account",user2.address,0); //idAccount1 0 //// referidos 3 cuentas y id5 ////LE DA A ID0 20%
    await membershipContract3.connect(user2).buyMembership(3, 1, 0, user2.address, ""); //idAccount1 0 //// referidos 3 cuentas y id5 ////LE DA A ID0 20%
    await membershipContract3.connect(user2).buyMembership(3, 1, 0, user2.address, ""); //idAccount1 0 //// referidos 3 cuentas y id5 ////LE DA A ID0 20%

    
    const balance = await token.balanceOf(user1.address)
    console.log(ethers.formatEther(balance))
    await membershipContract3.connect(user1).claimReward(0); //idAccount1 0 //// referidos 3 cuentas y id5 ////LE DA A ID0 20%
    const balance2 = await token.balanceOf(user1.address)
    console.log(ethers.formatEther(balance2))

    const balance3 = await token.balanceOf(user1.address)
    console.log(ethers.formatEther(balance3))
    await account.connect(user1).claimReward(0); //idAccount1 0 //// referidos 3 cuentas y id5 ////LE DA A ID0 20%
    const balance4 = await token.balanceOf(user1.address)
    console.log(ethers.formatEther(balance4))

    console.log("//////")
    const balance5 = await token.balanceOf(user10.address)
    console.log(ethers.formatEther(balance5))
    await membershipContract3.connect(user10).claimRewardPartnerShip(); //idAccount1 0 //// referidos 3 cuentas y id5 ////LE DA A ID0 20%
    const balance6 = await token.balanceOf(user10.address)
    console.log(ethers.formatEther(balance6))

    console.log("//////")
    const balance7 = await token.balanceOf(user11.address)
    console.log(ethers.formatEther(balance7))
    await account.connect(user11).claimAdminWallet(); //idAccount1 0 //// referidos 3 cuentas y id5 ////LE DA A ID0 20%
    const balance8 = await token.balanceOf(user11.address)
    console.log(ethers.formatEther(balance8))

    const rewards1 = await membershipContract3.rewards(1)
    console.log(ethers.formatEther(rewards1))

    await poi.connect(user3).storeInfo("user3","user3","user3","user3","user3","user3","user3");
    await account.connect(user3).createAccount("Main Account",user3.address,1); //idAccount1 0 //// referidos 3 cuentas y id5 ////LE DA A ID0 20%
    await membershipContract3.connect(user3).buyMembership(3, 2, 1, user3.address, ""); //idAccount1 0 //// referidos 3 cuentas y id5 ////LE DA A ID0 20%
    

    const rewards2 = await membershipContract3.rewards(1)
    console.log(ethers.formatEther(rewards2))

    await account.connect(user2).createAccount("Main Account",user2.address,1); //idAccount1 0 //// referidos 3 cuentas y id5 ////LE DA A ID0 20%
    await membershipContract3.connect(user2).buyMembership(3, 3, 1, user2.address, ""); //idAccount1 0 //// referidos 3 cuentas y id5 ////LE DA A ID0 20%


    const rewards3 = await membershipContract3.rewards(1)
    console.log(ethers.formatEther(rewards3))

    await poi.connect(user4).storeInfo("user4","user4","user4","user4","user4","user4","user4");
    await account.connect(user4).createAccount("Main Account",user4.address,2); //idAccount1 0 //// referidos 3 cuentas y id5 ////LE DA A ID0 20%
    await membershipContract3.connect(user4).buyMembership(3, 4, 2, user4.address, ""); //idAccount1 0 //// referidos 3 cuentas y id5 ////LE DA A ID0 20%


    const rewards4 = await membershipContract3.rewards(1)
    console.log(ethers.formatEther(rewards4))



    const balance9 = await token.balanceOf(user2.address)
    console.log(ethers.formatEther(balance9))
    await membershipContract3.connect(user2).claimReward(1); //idAccount1 0 //// referidos 3 cuentas y id5 ////LE DA A ID0 20%
    const balance10 = await token.balanceOf(user2.address)
    console.log(ethers.formatEther(balance10))


    const rewards5 = await membershipContract3.rewards(1)
    console.log(ethers.formatEther(rewards5))

  });
});
