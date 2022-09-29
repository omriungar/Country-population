const app = document.querySelector('#app');

let data;
let country_name = [];
let country_pop = [];
let region_count = {};
let flag = [];

async function get_data(num){
    app.innerHTML = `<divd class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>`
    data = [];
    country_name = [];
    country_pop = [];
    region_count = {};
    flag = [];
    let my_url = '';
    my_url = num==1 ? `name/${$('#search_input').val()}` : 'all';

    
    let api = await fetch (`https://restcountries.com/v3.1/${my_url}`);
    data = await api.json();
    app.innerHTML = data.message == "Page Not Found" &&  `<h1 class= "container">Search Invalid. Please Try Again</h1>`;
    
    clac();
}

function clac(){
    data.forEach(e => {
        country_name.push(e.name.official);
        country_pop.push(e.population);
        flag.push(e.flags.png)
        console.log(e.region);
        if (region_count[e.region]){
            region_count[e.region]++;
        }else{
            region_count[e.region]=1;
        }
    });
    print_to();
   
}

function print_to(){
    let html = '';
    let table1 = '<h2>Population Count</h2></br>';
    let table2 = '<h2>Region Count</h2></br>';
    region_count = Object.entries(region_count);
    for(i=0; i < country_name.length; i++){
        table1 +=       `<tr>
                        <th scope="row">${i+1}</th>
                        <td>${country_name[i]}</td>
                        <td>${country_pop[i]}</td>
                        <td><img src = '${flag[i]}' width="30px;"></td>
                        </tr>`
    }
    for(i=0; i < region_count.length; i++){
        table2 +=   `<th scope="row">${i+1}</th>
                        <td>${region_count[i][0]}</td>
                        <td>${region_count[i][1]}</td>
                        </tr>`
    }

    html += `</br>
            <div class="container d-flex justify-content-around">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">total countries result</h5>
                <p class="card-text">${country_name.length}</p>
                
                </div>
            </div>
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">total countries population</h5>
                <p class="card-text">${country_pop.reduce((sum,n) => sum + n )}</p>
                
                </div>
            </div>
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">average population</h5>
                <p class="card-text">${(country_pop.reduce((sum,n) => sum + n ))/country_name.length}</p>
                
                </div>
            </div>
            </div>
            </br>
          
            <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">country</th>
                <th scope="col">population</th>
                <th scope="col">flag</th>
              </tr>
            </thead>
            <tbody>
                    ${table1}
            </tbody>
            

            </table>
            <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">region</th>
                <th scope="col">number of countries</th>
              </tr>
            </thead>
            <tbody>
                    ${table2}
            </tbody>
            </table>
            
           `
    

            app.innerHTML = html;

}