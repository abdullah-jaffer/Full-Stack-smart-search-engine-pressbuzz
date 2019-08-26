export const preProcess = (data)=>{
    let dataFor = {};
    let counts = {};
    counts[" "] = 0;
    let i = 0;
    for (i = 0; i < Object.keys(data).length; i++) {
      console.log(data[i].pub_date);
      let date = String(data[i].pub_date);
      let year = date.split("-")[0];
      counts[year] = counts[year] ? counts[year] + 1 : 1;
    }
    dataFor['Barchart'] = counts;
    return dataFor;

}
