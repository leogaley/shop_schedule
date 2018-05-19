// Function to create icon field

function icons(check, hd, photo) {
    let iconCode = "";
    if (check == "yes"){
        iconCode += a;
    }
    if (hd == true){
        iconCode += b;
    }
    if (photo == true){
        iconCode += c;
    }

    return iconCode;
}

// Function to map requested data to a more usable format

 function mapper (data) {  
    //  console.log ("d:   " + data); 
    let filteredDataObject = [];

    for (let i = 0; i < data.length; i++) {

        console.log ("map!" + data[i]);
        // if (data[i].columns.custbody162.name){
        //     let a = data[i].columns.custbody162.name;
        // } else {let a = "";}
        // if (data[i].columns.custbody32){
        //     let b = data[i].columns.custbody32;
        // } else {let a = "";}
        // if (data[i].columns.custbody162.name){
        //     let c = data[i].columns.custbody144;
        // } else {let a = "";}
        // let iconCode = icons(a, b, c);
        filteredDataObject.push({
            wo:data[i].columns.tranid,
            item:data[i].columns.item.name,
            desc:data[i].columns.displayname,
            note:data[i].columns.memo,
            // icons:iconCode,
            qty:data[i].columns.formulanumeric,
            duedate:data[i].columns.enddate,
            bo:data[i].columns.quantitybackordered,
            bs:data[i].columns.custbody34.name,
            iss:data[i].columns.custbody178.name,
            cust:data[i].columns.entity.name
        });
    
    };

    console.log("mapper");
    return filteredDataObject;
}

module.exports = mapper;