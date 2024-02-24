async function main() {
  const Event = await ethers.getContractFactory("EventContract");

  // Start deployment, returning a promise that resolves to a contract object
  const Event_ = await Event.deploy();
  console.log("Contract address:", Event_.address);


}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });