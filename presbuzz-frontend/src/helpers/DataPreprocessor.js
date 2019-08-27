export const preProcess = (data)=>{
    if(data === undefined){
        return "no data";
    }else {

    let dataFor = {};
    
    let idList = "";
    let counts = {};
    let sentimentsList = [];
    let sentimentCounts = {};
    let sentimentsCounter = {};
    sentimentCounts["positive"] = 0;
    sentimentCounts["negative"] = 0;
    sentimentCounts["neutral"] = 0;
    let sentimentPositivty;

    counts[" "] = 0;
    let i = 0;
    for (i = 0; i < Object.keys(data).length; i++) {

      if(i === (Object.keys(data).length-1)){
         idList += data[i].id;
      }else{
         idList += data[i].id + ",";
      }

      let date = String(data[i].pub_date);
      let year = date.split("-")[0];
      counts[year] = counts[year] ? counts[year] + 1 : 1;

      let sentiments = {
        day: data[i].pub_date.split("T")[0],
        value: data[i].polarity
      };
      sentimentsList.push(sentiments); 
      
      if (sentimentsCounter[data[i].pub_date.split("T")[0]]) {
        sentimentsCounter[data[i].pub_date.split("T")[0]] = {
          sum:
          sentimentsCounter[data[i].pub_date.split("T")[0]].polarity +
            data[i].polarity,
          occurence:
          sentimentsCounter[data[i].pub_date.split("T")[0]].occurence + 1
        };
      } else {
        sentimentsCounter[data[i].pub_date.split("T")[0]] = {
          sum: data[i].polarity,
          occurence: 1
        };
      }

      sentimentPositivty = data[i].polarity;
      if (sentimentPositivty < 0) {
        sentimentCounts["negative"] = sentimentCounts["negative"] ? sentimentCounts["negative"] + 1 : 1;
      } else if (sentimentPositivty > 0) {
        sentimentCounts["positive"] = sentimentCounts["positive"] ? sentimentCounts["positive"] + 1 : 1;
      } else {
        sentimentCounts["neutral"] = sentimentCounts["neutral"] ? sentimentCounts["neutral"] + 1 : 1;
      }

    }

    let averageSentiments = [];

    for (let key in sentimentsCounter) {
      if (sentimentsCounter.hasOwnProperty(key)) {
        console.log(key + " -> " + sentimentsCounter[key]);
        averageSentiments[key] =
        sentimentsCounter[key].sum / sentimentsCounter[key].occurence;
      }
    }

    dataFor['idList'] = idList;
    dataFor["Mentions"] = Object.keys(data).length;
    dataFor['Barchart'] = counts;
    dataFor['Calendar'] = sentimentsList;
    dataFor['Linechart'] = averageSentiments;
    dataFor['Piewheel'] = sentimentCounts;

    return dataFor;

    }

}
