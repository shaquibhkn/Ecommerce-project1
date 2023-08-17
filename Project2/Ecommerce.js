const total = document.getElementById('total');

async function saveOnDatabase(event){
    event.preventDefault();
    const sPrice = parseFloat(event.target.price.value);
    const pName = event.target.product_name.value;

    const Productobj = {
      sPrice :  sPrice,
      pName : pName
    };
    
    try {
      const response = await axios.post("https://crudcrud.com/api/1052418b00e04bb986b52be7445205bf/productsData", Productobj);
      saveProductOnScreen(response.data);
      addTotal(Productobj.sPrice);
    } catch (err) {
      document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong1<h4>";
      //console.log(obj);
    }
}

function addTotal(price) {
    let currentTotal = parseFloat(total.innerHTML);
    if(isNaN(currentTotal)) {
      currentTotal = 0;
    }
    total.innerHTML = currentTotal + price;
}

function deleteTotal(price) {
    let currentTotal = parseFloat(total.innerHTML);
    if(isNaN(currentTotal)) {
      currentTotal = 0;
    }
    total.innerHTML = currentTotal - price;
}

async function saveProductOnScreen(Productobj){
    const parentEle = document.getElementById('listOfItems');
    const childEle = document.createElement('li');
    childEle.textContent = Productobj.sPrice + ' - ' + Productobj.pName ;

    const deleteButton = document.createElement('input');
    deleteButton.type = "button";
    deleteButton.value = "Delete Product";
     let sum=0;
    deleteButton.onclick = async () => {
      try {
        await axios.delete("https://crudcrud.com/api/1052418b00e04bb986b52be7445205bf/productsData/" + Productobj._id);
        parentEle.removeChild(childEle);   
        deleteTotal(Productobj.sPrice);
      } catch (err) {
        console.log(err);
      }
    }
    childEle.appendChild(deleteButton);
    parentEle.appendChild(childEle);

}


window.addEventListener("DOMContentLoaded", async () => {
      try {
    const response = await axios.get("https://crudcrud.com/api/1052418b00e04bb986b52be7445205bf/productsData");
    for(let i = 0; i < response.data.length; i++) {
      saveProductOnScreen(response.data[i]);  
      addTotal(response.data[i].sPrice);           
    }    
  } catch (err) {
    document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong2<h4>";
  }
  });