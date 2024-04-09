import dateFormat, { masks } from "dateformat";

function GetTime(date) {
  var hours = parseInt(dateFormat(date, "hh"));
  var minutes = parseInt(dateFormat(date, "MM"));
  var ampm = hours >= 12 ? "AM" : "PM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}
const PdfCode = (
  allData,data
) => `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body >
    <div style="min-height: auto;
    width: 100%;
    height : auto;
    border: solid 2px #000;"  >
    <div style="height: auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    /* padding: 20px; */
    justify-content: space-between;
    align-items: center;">
    <div class="data-title">
        <div style="display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 2rem;  
        padding-left: 20px;">Name of shop<br></div>
    <div style="
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    padding-left: 20px;
    ">tell what shop is about</div>
    </div>
   
        <img style="
        height: 90px;
    width: 90px;
    margin-right:15px;
        " src="https://www.shitpostbot.com/img/sourceimages/angery-mango-57b56c0554f83.jpeg" />
    </div>
    <hr />
        <hr/>


        <div style="
        width: 100%;
        height: auto;
        padding: 15px;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        ">
            <div style="
            width: 50%;
            align-items: flex-start;
            ">
                <p class="invoice-user">
                    Bill To : <br/>
                    Name : ${allData.name} <br/>
                    Address : ${allData.Address} <br/>
                    Phone No : +91 ${allData.Mobile_No}
                </p>
            </div>
            <div style="align-items: flex-end;">
                <p>Invoice No : ${"Invoice",' Not available'}<br/>
                Date : ${dateFormat(Date.now(), "dd-mm-yyyy")}<br/>
                Time :${GetTime(new Date())}</p>
                <br/>
                <br/>
                <p>Mobile No :- <br/>
                +91 0000000000<br/>
                +91 00000000000
                </p>
            </div>
        </div>
        <hr/>
        <hr/>
        <div style="height: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;">
            <table style="width:100%; border-collapse: collapse;">
                <tr style="background-color: rgba(72, 101, 0, 0.845); color: white;">
                  <th style="height: 30px;">ITEM</th>
                  <th style="height: 30px;">LOT</th>
                  <th style="height: 30px;">BAGS</th>
                  <th style="height: 30px;">GROSS WT.</th>
                  <th style="height: 30px;">NETT WT.</th>
                  <th style="height: 30px;">RATE</th>
                  <th style="height: 30px;">PER</th>
                  <th style="height: 30px;">AMOUNT</th>
                </tr>

                ${data}
                
               
              </table>
            <hr/>
            <hr/>

              <div style="width:100%;align-self: flex-end; display: flex; flex-direction: row;">
                <div style="width:40%"></div>
                  <table style="width: 50%; align-self: flex-end;">
                  <tr>
                  <th style="text-align: start;">(+) PAKING LOADING SMALL </th>
                  <td style="text-align: center;height: 30px;">₹ ${"Total"}</td>
              </tr>
                        <tr style="border-bottom: solid ;">
                            <th style="text-align: start;">(+) 04 PAPER EXP </th>
                            <td style="text-align: center;height: 30px;">₹ ${"ReceivedBalance"}</td>
                        </tr>
                       
                        <tr style="border-bottom: solid ;">
                        <th style="text-align: start;">(+) 05 TAPE ROLL</th>
                        <td style="text-align: center;height: 30px;">₹ ${"RemainingBalance"}</td>
                    </tr>
                        <tr>
                            <th style="text-align: start;">(+) 03 C/P </th>
                            <td style="text-align: center;height: 30px;">${"PaymentType"}</td>
                        </tr>
                        <tr>
                        <th style="text-align: start;">(+) 09 COMMISSION </th>
                        <td style="text-align: center;height: 30px;">${"PaymentType"}</td>
                    </tr>
                    <tr>
                    <th style="text-align: start;">(+) GADI BHADA (2890 x 6) </th>
                    <td style="text-align: center;height: 30px;">${"PaymentType"}</td>
                </tr>
                  </table>
              </div>
        </div>
        <hr/>
        <hr/>
        <!--

            <div style="height:auto; padding: 20px;">
                
                <p>Account Details - <br/>
                    Bank Name: HDFC BANK, DHANGARWADI<br/>
                    Bank Account no : 50100272967118<br/>
                    Bank IFSC code : HDFC0004850<br/>
                </p>
                
            </div>
        -->

    </div>
  </body>
</html>
`;

const style = `
    .container {
      margin : 15px;
      border : solid 2px #000
    }
`;

export { PdfCode };
