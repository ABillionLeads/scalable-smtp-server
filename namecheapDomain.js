const axios = require('axios');
const xml2js = require('xml2js');
let params = '';
let param_count = 0;
const apiUrlSandBox = `https://api.sandbox.namecheap.com/xml.response`;
const apiUrlProduction = `https://api.namecheap.com/xml.response`;


const ApiUser = 'gpsopenshift';
const ApiKey = 'c225ae154a984920859a45907b1aa4bc';
const UserName = 'gpsopenshift';
const Command = 'namecheap.domains.create';
const ClientIp = '188.26.248.142';


exports.buyDomain = async (DomainName) => {
  const Years = 1;
  const RegistrantFirstName = 'Test';
  const RegistrantLastName = 'Ultimu';
  const RegistrantAddress1 = 'strada de test';
  const RegistrantCity = 'Sigghet';
  const RegistrantStateProvince = 'cartieru';
  const RegistrantPostalCode = '0034';
  const RegistrantCountry = 'Romania';
  const RegistrantPhone = '+1.6613102107';
  const RegistrantEmailAddress = 'gpsopenshift@gmail.com';
  const TechFirstName = RegistrantFirstName;
  const TechLastName = RegistrantLastName;
  const TechAddress1 = RegistrantAddress1;
  const TechCity = RegistrantCity;
  const TechStateProvince = RegistrantStateProvince;
  const TechPostalCode = RegistrantPostalCode;
  const TechCountry = RegistrantCountry;
  const TechPhone = RegistrantPhone;
  const TechEmailAddress = RegistrantEmailAddress;
  const AdminFirstName = RegistrantFirstName;
  const AdminLastName = RegistrantLastName;
  const AdminAddress1 = RegistrantAddress1;
  const AdminCity = RegistrantCity;
  const AdminStateProvince = RegistrantStateProvince;
  const AdminPostalCode = RegistrantPostalCode;
  const AdminCountry = RegistrantCountry;
  const AdminPhone = RegistrantPhone;
  const AdminEmailAddress = RegistrantEmailAddress;

  const AuxBillingFirstName = RegistrantFirstName;
  const AuxBillingLastName = RegistrantLastName;
  const AuxBillingAddress1 = RegistrantAddress1;
  const AuxBillingCity = RegistrantCity;
  const AuxBillingStateProvince = RegistrantStateProvince;
  const AuxBillingPostalCode = RegistrantPostalCode;
  const AuxBillingCountry = RegistrantCountry;
  const AuxBillingPhone = RegistrantPhone;
  const AuxBillingEmailAddress = RegistrantEmailAddress;
 
 try {

  // Make the GET request with Axios to buy Domain
let response = await axios.get(`${apiUrlSandBox}?ApiUser=${ApiUser}&ApiKey=${ApiKey}&UserName=${UserName}
    &Command=${Command}&ClientIp=${ClientIp}&DomainName=${DomainName}
    &Years=${Years}&RegistrantFirstName=${RegistrantFirstName}
    &RegistrantLastName=${RegistrantLastName}&RegistrantAddress1=${RegistrantAddress1}
    &RegistrantCity=${RegistrantCity}&RegistrantStateProvince=${RegistrantStateProvince}
    &RegistrantPostalCode=${RegistrantPostalCode}&RegistrantCountry=${RegistrantCountry}
    &RegistrantPhone=${RegistrantPhone}&RegistrantEmailAddress=${RegistrantEmailAddress}
    &TechFirstName=${TechFirstName}&TechLastName=${TechLastName}&TechAddress1=${TechAddress1}
    &TechCity=${TechCity}&TechStateProvince=${TechStateProvince}&TechPostalCode=${TechPostalCode}
    &TechCountry=${TechCountry}&TechPhone=${TechPhone}&TechEmailAddress=${TechEmailAddress}
    &AdminFirstName=${AdminFirstName}&AdminLastName=${AdminLastName}&AdminAddress1=${AdminAddress1}
    &AdminCity=${AdminCity}&AdminStateProvince=${AdminStateProvince}&AdminPostalCode=${AdminPostalCode}
    &AdminCountry=${AdminCountry}&AdminPhone=${AdminPhone}&AdminEmailAddress=${AdminEmailAddress}
    &AuxBillingFirstName=${AuxBillingFirstName}&AuxBillingLastName=${AuxBillingLastName}
    &AuxBillingAddress1=${AuxBillingAddress1}&AuxBillingCity=${AuxBillingCity}
    &AuxBillingStateProvince=${AuxBillingStateProvince}&AuxBillingPostalCode=${AuxBillingPostalCode}
    &AuxBillingCountry=${AuxBillingCountry}&AuxBillingPhone=${AuxBillingPhone}
    &AuxBillingEmailAddress=${AuxBillingEmailAddress}
  `)

    console.log(response.data);
    // Parse XML to JSON
    let xmlResponse = response.data.trim();
        
    xml2js.parseString(xmlResponse, (err, result) => {
        if (err) {
            console.error('Error parsing XML:', err);
            return ({message:"Internal Server Error"});
        }
        //Checking Response Status
        if(result["ApiResponse"]["$"]["Status"] == "ERROR"){
            return result;
        }

      
        res.status(201).json(result);
    });
 
 }
  catch(error) {
   console.log(error);
  }
};



//Set Record for the Domain
exports.setRecord = ()=>{

  const ApiUser = req.body.ApiUser;
  const ApiKey = req.body.ApiKey;
  const UserName = req.body.UserName;
  const Command = req.body.Command;
  const ClientIp = req.body.ClientIp;
  const SLD = req.body.SLD;
  const TLD = req.body.TLD;
  const Address1 = req.body.Address1;
  const ttl = req.body.ttl;
  const HostName1 = req.body.HostName1;
  const RecordType1 = req.body.RecordType1;

  //console.log(ApiUser, ApiKey, UserName, Command, ClientIp, SLD, TLD, Address1, ttl, HostName1, RecordType1 )    


  
  //First Fetch all existings records as the set Record API deletes existing records

   axios.get(`${apiUrlProduction}?ApiUser=${ApiUser}&ApiKey=${ApiKey}
   &UserName=${UserName}&Command=namecheap.domains.dns.getHosts
   &ClientIp=${ClientIp}&SLD=${SLD}&TLD=${TLD}`).then(response=>{
    
    //Parse XML to JSON
    let xmlResponse = response.data.trim();
    xml2js.parseString(xmlResponse, (err, result) => {
      if (err) {
          console.error('Error parsing XML:', err);
          return res.status(500).json({message:"Internal Server Error"});
      }
      //Checking Response Status
      if(result["ApiResponse"]["$"]["Status"] == "ERROR"){
          return res.status(400).json(result);
      }
      
      //console.log(result["ApiResponse"]["CommandResponse"][0]["DomainDNSGetHostsResult"][0]["host"]);
      
      //Setting Params for mutiple sets:
      let array = result["ApiResponse"]["CommandResponse"][0]["DomainDNSGetHostsResult"][0]["host"];
      
      if(array !== undefined){

     
        array.forEach((el,index)=>{
        
          params += `&RecordType${index + 1}=${el["$"]["Type"]}&Address${index + 1}=${el["$"]["Address"]}
          &HostName${index + 1}=${el["$"]["Name"]}&ttl${index + 1}=${el["$"]["TTL"]}`;
          param_count = index + 1;
        
        });
      }
      //console.log(params);
      //Setting Param for new set record
      param_count = param_count + 1;

      

      params += `&RecordType${param_count}=${RecordType1}&Address${param_count}=${Address1}
      &HostName${param_count}=${HostName1}&ttl${param_count}=${ttl}`;
     
  
     //Setting set record for new record and existing records:
    axios.get(`${apiUrlProduction}?ApiUser=${ApiUser}&ApiKey=${ApiKey}}
    &UserName=${UserName}&Command=${Command}&ClientIp=${ClientIp}&SLD=${SLD}&TLD=${TLD}
    ${params}`).then(response => {
      // Parse XML to JSON
  
      let xmlResponse = response.data.trim();
          
      xml2js.parseString(xmlResponse, (err, result) => {
          if (err) {
              console.error('Error parsing XML:', err);
              return res.status(500).json({message:"Internal Server Error"});
          }
          //Checking Response Status
          if(result["ApiResponse"]["$"]["Status"] == "ERROR"){
              return res.status(400).json(result);
          }
  
        
          res.status(201).json(result);
      });
    }).catch(error => {
  
      if(Object.keys(error).length === 0){
        return res.status(500).json({message:"Internal Server Error"});
      }else{
        return res.status(301).json({message:error});
      }
    
  });


      
       //res.status(201).json(result["ApiResponse"]["CommandResponse"][0]["DomainDNSGetHostsResult"][0]["host"]);
  });
    
    

   }).catch(error=>{
    if(Object.keys(error).length === 0){
      return res.status(500).json({message:"Internal Server Error"});
    }else{
      return res.status(301).json({message:error});
    }
    
   });

  //axios.get(`https://api.sandbox.namecheap.com/xml.response?ApiUser=${ApiUser}&ApiKey=${ApiKey}}&UserName=${UserName}&Command=${Command}&ClientIp=${ClientIp}&SLD=${SLD}&TLD=${TLD}&Address1=${Address1}&ttl=${ttl}&HostName1=${HostName1}&RecordType1=${RecordType1}`).then(response => {
  //   axios.get(`${apiUrl}?ApiUser=${ApiUser}&ApiKey=${ApiKey}}
  //   &UserName=${UserName}&Command=${Command}&ClientIp=${ClientIp}&SLD=${SLD}&TLD=${TLD}
  //   &Address1=${Address1}&ttl=${ttl}&HostName1=${HostName1}
  //   &RecordType1=${RecordType1}`).then(response => {
  //   // Parse XML to JSON
  //   let xmlResponse = response.data.trim();
        
  //   xml2js.parseString(xmlResponse, (err, result) => {
  //       if (err) {
  //           console.error('Error parsing XML:', err);
  //           return res.status(500).json({message:"Internal Server Error"});
  //       }
  //       //Checking Response Status
  //       if(result["ApiResponse"]["$"]["Status"] == "ERROR"){
  //           return res.status(400).json(result);
  //       }

      
  //       res.status(201).json(result);
  //   });
  // })
  // .catch(error => {
  
  //    res.status(301).json({message: "Failed to call NameCheap Server. Kindly try again"})
    
  // });


 


}