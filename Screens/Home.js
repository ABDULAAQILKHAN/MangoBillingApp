import {StyleSheet, 
        Text, 
        View,Button, 
        Pressable, 
        Modal,
        TextInput, 
        ScrollView,
        KeyboardAvoidingView, 
        SafeAreaView,
        Platform } from 'react-native';
import { useState, useEffect } from "react";
import dateFormat, { masks } from "dateformat";
import {Picker} from "@react-native-picker/picker";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import {PdfCode} from "../Component/PdfCode";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Dialog from "react-native-dialog";
const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDialogeVisible, setconfirmDialogeVisible] = useState(false)
  const [confirmAllresetVisible, setconfirmAllresetVisible] = useState(false)
  const [confirmitemresetVisible, setconfirmitemresetVisible] = useState(false)
  const [deleteItemConfirm, setdeleteItemConfirm] = useState(false)
  const [itemToDelete,setItemToDelete] = useState("");
  const [itemType, setItemType] = useState("")
  const [totalLot, setTotalLot] = useState();
  const [selected,setSelected] = useState([])
  const [temp, setTemp] = useState([])
  const [allDetailsFlag, setAlldetailsFlag] = useState(false)
  const [item, setItem] = useState({
    type: "",
    lot : "",
    bags: "",
    grossWT : "",
    netWt : "",
    rate : "",
    per : "KG",
    amount: ""
  })
  /*
  */
  useEffect(()=>{
    if(item.netWt && item.rate && !item.amount){
      let amt = eval(`${item.netWt} * ${item.rate}`).toString();
      setItem({...item,amount: amt})
    }
    if(item.type &&
      item.lot &&
      item.bags &&
      item.grossWT &&
      item.netWt &&
      item.rate &&
      item.per &&
      item.amount){
        setAlldetailsFlag(true)
      }else{
        setAlldetailsFlag(false)
      }
  },[item])
  const [allData, setAllData] = useState({
    name: "",
    Address: "",
    Mobile_No: "",
    Items: []
  })
  useEffect(()=>{
    let lots_array = temp.map(item=>{
      return item.lot;
    })
    let sum = 0;
    //console.log(lots_array)
    lots_array.map(item=>{
      sum = eval(`${sum} + ${item}`)
    })
    setTotalLot(sum)
  },[temp])


  useEffect(()=>{
    setItem({...item,type: itemType})
  },[itemType])


/*
features for ios

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  }

    const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  }
  */
  const ResetDetails = ()=>{
    setItem({...item,
      type: "",
      lot : "",
      bags: "",
      grossWT : "",
      netWt : "",
      rate : "",
      per : "KG",
      amount: ""
    })
    setconfirmitemresetVisible(false)

  }
  const allReset = ()=>{
    setAllData({...allData,name : "",Address: "",Mobile_No: "",Items: []})
    setSelected([])
    setconfirmAllresetVisible(false)
    setItem({...item,
      type: "",
      lot : "",
      bags: "",
      grossWT : "",
      netWt : "",
      rate : "",
      per : "KG",
      amount: ""
    })
  }
  function removeElement(array, element) {
    const index = array.indexOf(element);
    if (index !== -1) {
        array.splice(index, 1);
    }
    return array;
}

  useEffect(()=>{
    //console.log("clicked")
    if(deleteItemConfirm){
      let temp = allData.Items;
      temp.map((item,index)=>{
        if(item.type===itemToDelete){
          temp.splice(index,1)
        }
      })
      setAllData({...allData,Items: temp});
      setSelected(prev=>removeElement(prev,itemToDelete))
      setconfirmDialogeVisible(false)
      setdeleteItemConfirm(false)
  }else{
    console.log(false)
  }
  },[deleteItemConfirm]);


  const removeItem = (type)=>{
    if(!selected.includes(type)){
      alert("Select item!")
    }else{
      setconfirmDialogeVisible(true)
      setItemToDelete(type)
    }
    }

  const handleCreateInvoice = () =>{
    let data = ""
    allData.Items.forEach(item => {
      if(item)
        data = data + 

        `<tr style="background-color: rgba(246, 221, 178, 0.8);">
        <td style="text-align: center;height: 30px;">${item.type}</td>
        <td style="text-align: center;height: 30px;">${item.lot}</td>
        <td style="text-align: center;height: 30px;">${item.bags}</td>
        <td style="text-align: center;height: 30px;">${item.grossWT}</td>
        <td style="text-align: center;height: 30px;">${item.netWt}</td>
        <td style="text-align: center;height: 30px;">${item.rate}</td>
        <td style="text-align: center;height: 30px;">₹ ${item.per}</td>
        <td style="text-align: center;height: 30px;">${item.amount}</td>
      </tr>`
    });
    //console.log(data)
    printToFile(data);
  }


  useEffect(()=>{
    setAllData({...allData,Items: temp});
  },[temp])

  const handleAddItem = ()=>{
   
    setTemp(prev=>[...prev,item]);
    if(selected.includes(item.type)){
      let toOp = temp;

      temp.map((data,index)=>{
        if(data.type === item.type){
          toOp[index] = item;
          setTemp(toOp);
        }
      })
    }
    setSelected(prev=>[...prev,item.type])
    setItemType("")
    ResetDetails();
    setModalVisible(false);
  }
  useEffect(()=>{
    if(itemType){
      if(selected.includes(itemType)){
        allData.Items.map((item,index)=>{
          if(item.type === itemType){
            let temp = allData.Items[index];
                setItem({...item,
                  type: temp.type ? temp.type : "",
                  lot: temp.lot ? temp.lot : "",
                  bags: temp.bags ? temp.bags : "",
                  grossWT: temp.grossWT ? temp.grossWT : "",
                  netWt: temp.netWt ? temp.netWt : "",
                  rate: temp.rate ? temp.rate : "",
                  per: temp.per ? temp.per : "",
                  amount: temp.amount ? temp.amount : ""
                })
          }
        })
      }
    }
  },[itemType])
  const printToFile = async (data) => {


    let html = PdfCode(allData,data);
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    try{
      const { uri } = await Print.printToFileAsync({
        html
      });
      console.log('File has been saved to:', uri);
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
/*
      set_Name('');
      setInvoice(dateFormat(now, "ddmmyyhhMss"));
      setTotal('');
      setQuantity('');
      SetReceivedBalance('');
      Set_Address('');
      Set_Mobile_No('');
      
*/
    }catch(err){
        Alert.alert("Make shure You have Internet Connection or contact @+91 8989680289");
    }


  }
    return ( <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          ResetDetails();
          setModalVisible(!modalVisible);
          if(!allDetailsFlag){
            //alert("blank")
            //setSelected(prev=>removeElement(prev,itemType))
            //setconfirmitemresetVisible(true)
            //setdeleteItemConfirm(true)
            //setItemToDelete(itemType)
          }

        }}
      >

            <View style={{
              width: "100%",
              overflow: "hidden",
              borderBottomWidth: 2,
              height: "auto",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}>
              <Text style={{fontSize: 20,padding:10}}>{itemType} | Enter Details</Text>
            </View>
        <SafeAreaView style={styles.containerModal}>
          <ScrollView>

        <View style={{

          height: "100%",
          width: "100%",
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start"
        }}>

            <View style={{
              marginTop: 5,
              alignSelf: "center",
              width: "100%"
            }}>
              <View style={styles.InputContainer}>
                <Text>Lot</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setItem({...item,lot: text})}
                  value={item.lot}
                  placeholder="Enter lot numbers"
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.InputContainer}>
                <Text>Bags</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setItem({...item,bags: text})}
                  value={item.bags}
                  placeholder="Enter number of Bags."
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.InputContainer}>
                <Text>Gross WT.</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setItem({...item,grossWT: text})}
                  value={item.grossWT}
                  placeholder="Enter Gross weight."
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.InputContainer}>
                <Text>Net WT.</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setItem({...item,netWt: text})}
                  value={item.netWt}
                  placeholder="Enter Net weight."
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.InputContainer}>
                <Text>Rate</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setItem({...item,rate: text})}
                  value={item.rate}
                  placeholder="Enter Rate"
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.InputContainer}>
                <Text>Weight in: </Text>
                <View style={styles.PickerContainer}>
                  <Picker
                    selectedValue={item.per}
                    
                    style={styles.Picker}
                    onValueChange={(itemValue, itemIndex) => setItem({...item,per: itemValue})}
                  >

                    <Picker.Item label="KG" value="KG" />
                    <Picker.Item label="LBS" value="LBS" />
                  </Picker>
                </View>
              </View>        

              <View style={styles.InputContainer}>
                <Text>Amount</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setItem({...item,amount: text})}
                  value={item.amount}
                  placeholder="Enter Amount"
                  keyboardType="number-pad"
                />
              </View>

            </View>
        </View>

        </ScrollView>
    </SafeAreaView>
            {
              //end button view
            }
            <View style={styles.EndBottons}>
              <Button 
              color={"red"}
              title="Reset"
              onPress={()=>setconfirmitemresetVisible(true)}
              />

              <Button 
              color={"green"}
              title="Add item"
              onPress={handleAddItem}
              />
            </View>
      </Modal>

{
  //confirm dialog box for item delete
}

      <View>
        <Dialog.Container visible={confirmDialogeVisible}>
          <Dialog.Title>Confirm</Dialog.Title>
          <Dialog.Description>
            {`Do you want to remove ${itemToDelete}?`}
          </Dialog.Description>
          <Dialog.Button label="NO" 
            bold={true}
            onPress={()=>{
              setItemToDelete("")
              setconfirmDialogeVisible(false)}}/>
          <Dialog.Button label="Yes" 
            color={"red"}
            bold={true}
            onPress={()=>setdeleteItemConfirm(true)} />
        </Dialog.Container>
      </View>
{
  //confirm dialog box for all reset
}

      <View>
        <Dialog.Container visible={confirmAllresetVisible}>
          <Dialog.Title>Confirm</Dialog.Title>
          <Dialog.Description>
            {`Do you want to Reset all!`}
          </Dialog.Description>
          <Dialog.Button label="Cancel" 
            bold={true}
            onPress={()=>setconfirmAllresetVisible(false)}/>
          <Dialog.Button label="Reset" 
            color={"red"}
            bold={true}
            onPress={allReset} />
        </Dialog.Container>
      </View>
      {
  //confirm dialog box for item reset
}

      <View>
        <Dialog.Container visible={confirmitemresetVisible}>
          <Dialog.Title>Confirm</Dialog.Title>
          <Dialog.Description>
            {`Do you want to clear details!`}
          </Dialog.Description>
          <Dialog.Button label="back" 
            bold={true}
            onPress={()=>setconfirmitemresetVisible(false)}/>
          <Dialog.Button label="Clear" 
            color={"red"}
            bold={true}
            onPress={ResetDetails} />
        </Dialog.Container>
      </View>


        <Text style={{fontSize:25,textDecorationLine: "underline",textDecorationStyle: "solid",alignSelf: "center",padding: 2}}>Create New Bill</Text>
      <SafeAreaView style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollView}
          >

         <View style={styles.InputContainer}>
          <Text>Name :</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setAllData({...allData,name: text})}
            value={allData.name}
            placeholder="Full Name"
          />
        </View>

        <View style={styles.InputContainer}>
          <Text>Address : </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setAllData({...allData,Address: text})}
            value={allData.Address}
            placeholder="Address"
          />
        </View>

        <View style={styles.InputContainer}>
          <Text>Mobile No : </Text>
          <TextInput
            style={styles.textInput}
            keyboardType="number-pad"
            onChangeText={(text) => setAllData({...allData,Mobile_No: text})}
            value={allData.Mobile_No}
            placeholder="Mobile No"
          />
        </View>
          <Text style={{fontSize: 25,textDecorationLine: "underline",margin: 10,alignSelf: "center"}}>Select Mango type</Text>
              <View
                style={[styles.button,{backgroundColor: selected.includes("Badam")?"lightgreen":"lightgrey"}]}
              >
                <View style={styles.buttonOuter}>
                  <View style={styles.buttonInner}>
                    <Pressable 
                    style={{width: "95%"}}
                    onPress={()=>{
                        setModalVisible(true)
                        setItemType("Badam")
                      }}
                      >
                    <Text style={{fontSize: 18}}>Badam</Text>
                    </Pressable>
                    <Pressable 
                      onPress={()=>removeItem("Badam")}>
                      <Text style={styles.cross}>
                      <Icon name="delete" size={28} color={"red"} />
                      </Text>
                    </Pressable>
                  </View>

                </View>
              </View>
              <View
                style={[styles.button,{backgroundColor:  selected.includes("Laal bahar")?"lightgreen":"lightgrey"}]}

              >
                <View style={styles.buttonOuter}>
                  <View style={styles.buttonInner}>
                    <Pressable 
                    style={{width: "95%"}}
                    onPress={()=>{
                        setModalVisible(true)
                        setItemType("Laal bahar")
                      }}
                    >
                    <Text style={{fontSize: 18}}>Laal bahar</Text>
                    </Pressable>
                    <Pressable 
                      onPress={()=>removeItem("Laal bahar")}>
                      <Text style={styles.cross}>
                      <Icon name="delete" size={28} color={"red"} />
                      </Text>
                    </Pressable>
                  </View>

                </View>
              </View>
              <View
                style={[styles.button,{backgroundColor:  selected.includes("Tota pari")?"lightgreen":"lightgrey"}]}
                >
                <View style={styles.buttonOuter}>
                  <View style={styles.buttonInner}>
                    <Pressable 
                    style={{width: "95%"}}
                    onPress={()=>{
                        setModalVisible(true)
                        setItemType("Tota pari")
                      }}>
                      <Text style={{fontSize: 18}}>Tota pari</Text>
                    </Pressable>
                    <Pressable 
                      onPress={()=>removeItem("Tota pari")}>
                      <Text style={styles.cross}>
                      <Icon name="delete" size={28} color={"red"} />
                      </Text>
                    </Pressable>
                  </View>

                </View>
              </View>
              <View
                style={[styles.button,{backgroundColor:  selected.includes("Haffus")?"lightgreen":"lightgrey"}]}

              >
                <View style={styles.buttonOuter}>
                  <View style={styles.buttonInner}>
                    <Pressable 
                    style={{width: "95%"}}
                    onPress={()=>{
                        setModalVisible(true)
                        setItemType("Haffus")
                      }}
                    >
                      <Text style={{fontSize: 18}}>Haffus</Text>
                    </Pressable>
                    <Pressable 
                      onPress={()=>removeItem("Haffus")}>
                      <Text style={styles.cross}>
                      <Icon name="delete" size={28} color={"red"} />
                      </Text>
                    </Pressable>
                  </View>

                </View>

              </View>
              <View
                style={[styles.button,{backgroundColor:  selected.includes("Nilam")?"lightgreen":"lightgrey"}]}
              >
                <View style={styles.buttonOuter}>
                  <View style={styles.buttonInner}>
                    <Pressable
                      style={{width: "95%"}}
                      onPress={()=>{
                      setModalVisible(true)
                      setItemType("Nilam")
                    }}
                    >
                      <Text style={{fontSize: 18}}>Nilam</Text>
                    </Pressable>
                    <Pressable 
                      onPress={()=>removeItem("Nilam")}>
                      <Text style={styles.cross}>
                      <Icon name="delete" size={28} color={"red"} />
                      </Text>
                    </Pressable>
                  </View>

                </View>
              </View>
              <View
                style={[styles.button,{backgroundColor:  selected.includes("Daseri")?"lightgreen":"lightgrey"}]}
              >
                <View style={styles.buttonOuter}>
                  <View style={styles.buttonInner}>
                    <Pressable
                        style={{width: "95%"}}
                        onPress={()=>{
                        setModalVisible(true)
                        setItemType("Daseri")
                      }}
                    >
                      <Text style={{fontSize: 18}}>Daseri</Text>
                    </Pressable>
                    <Pressable 
                      onPress={()=>removeItem("Daseri")}>
                      <Text style={styles.cross}>
                      <Icon name="delete" size={28} color={"red"} />
                      </Text>
                    </Pressable>
                  </View>

                </View>
              </View>

        </ScrollView>
    </SafeAreaView>
        <View style={styles.EndBottons}>
          <Button 
          title="Reset"
          color={"red"}
          onPress={()=>{           
            setconfirmAllresetVisible(true)}}
          />

          <Button 
          title="Create Invoice"
          color={"green"}
          onPress={handleCreateInvoice}
          //onPress={printToFile}
          />
        </View>
    </>);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    containerModal: {
      flex: 1,
      backgroundColor: "#F5F5F5",
    },
    scrollView: {
      paddingTop: "5%"
    },
    EndBottons : {
      padding: 15,
      width: "100%",
      height: 'auto',
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignSelf: "center"
    },
    tinyLogo : {
      width : 100,
      height:100
    },
    InputContainer: {
      width: "90%",
      marginTop: 15,
      marginLeft: 15,
      marginRight: 15,
    },
    textInput: {
      // width:100,
      marginTop: 4,
      height: 40,
      borderColor: "#000",
      borderWidth: 1,
      borderRadius: 4,
      padding: 4,
      marginBottom:6
    },
    buttonOuter: {
      width: "80%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
    buttonInner: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    cross: {
      fontSize: 18,
      backgroundColor: "transparent",
      height: 30,
      width: 30,
      textAlign: "center",
      textAlignVertical: "center",
      borderRadius: 5
    },
    button: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: 50,
      borderRadius:4,
      width: "90%",
      margin: 5,
      alignSelf: "center"
    },
    PickerContainer:{
      marginTop:10,
      borderWidth:1,
      borderRadius:4,
      height:50
      
    },
  });
 
export default Home;