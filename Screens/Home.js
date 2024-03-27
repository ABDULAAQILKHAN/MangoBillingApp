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

const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, set_Name] = useState("");
  const [Address, Set_Address] = useState("");
  const [Mobile_No, Set_Mobile_No] = useState("");
  const [itemType, setItemType] = useState("")
  const [lot, setLot] = useState();
  const [bags, setBags] = useState();
  const [grossWT, setGrossWT] = useState();
  const [netWt, setNetWt] = useState();
  const [rate, setRate] = useState();
  const [per, setPer] = useState("KG");
  const [amount, setAmount] = useState();
  const [temp, setTemp] = useState([])
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
  useEffect(()=>{
    setItem({...item,type: itemType})
  },[itemType])
  const [allData, setAllData] = useState({
    name: "",
    Address: "",
    Mobile_No: "",
    Items: []
  })


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
  }
  const allReset = ()=>{
    set_Name("")
    Set_Address("")
    Set_Mobile_No("")
    setAllData({...allData,name : "",Address: "",Mobile_No: "",Items: temp})
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
    ResetDetails();
    setModalVisible(false);
  }

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
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >

        <SafeAreaView style={styles.containerModal}>
          <ScrollView contentContainerStyle={styles.scrollViewModal}>

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
              width: "100%",
              overflow: "hidden",
              borderBottomWidth: 2,
              height: "5%",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}>
              <Text style={{fontSize: 20}}>{itemType} | Enter Details</Text>
            </View>
            <View style={{
              marginTop: 15,
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
              {
                /**
                 * 
              <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex: 1,}}>
                </KeyboardAvoidingView>
                 */
              }
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
            {
              //end button view
            }
            <View style={styles.EndBottons}>
              <Button 
              title="Reset"
              onPress={ResetDetails}
              />

              <Button 
              title="Add item"
              onPress={handleAddItem}
              />
            </View>
        </View>

        </ScrollView>
    </SafeAreaView>
      </Modal>


      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>

          <Text style={{fontSize:25,textDecorationLine: "underline",textDecorationStyle: "solid"}}>Create New Bill</Text>
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
          <Text style={{fontSize: 25,textDecorationLine: "underline",marginTop: 15,}}>Select Mango type</Text>
              <View
                style={styles.button}
              >
                <View style={styles.buttonOuter}>
                  <View style={styles.buttonInner}>
                    <Pressable 
                      //</View>onPress={() => navigation.navigate('Add Item', {type:"badam"})}
                      onPress={()=>{
                        setModalVisible(true)
                        setItemType("badam")
                      }}
                      >
                    <Text style={{fontSize: 18}}>Badam</Text>
                    </Pressable>
                    <Pressable 
                      onPress={()=>alert("Crossed pressed!")}>
                      <Text style={styles.cross}>X</Text>
                    </Pressable>
                  </View>

                </View>
              </View>
              <View
                style={styles.button}

              >
                <View style={styles.buttonOuter}>
                  <View style={styles.buttonInner}>
                    <Pressable 
                      onPress={()=>{
                        setModalVisible(true)
                        setItemType("Laal bahar")
                      }}
                    >
                    <Text style={{fontSize: 18}}>Laal bahar</Text>
                    </Pressable>
                    <Text style={styles.cross}>X</Text>
                  </View>

                </View>
              </View>
              <View
                style={styles.button}
                >
                <View style={styles.buttonOuter}>
                  <View style={styles.buttonInner}>
                    <Pressable 
                      onPress={()=>{
                        setModalVisible(true)
                        setItemType("Tota pari")
                      }}>
                      <Text style={{fontSize: 18}}>Tota pari</Text>
                    </Pressable>
                    <Text style={styles.cross}>X</Text>
                  </View>

                </View>
              </View>
              <View
                style={styles.button}

              >
                <View style={styles.buttonOuter}>
                  <View style={styles.buttonInner}>
                    <Pressable 
                      onPress={()=>{
                        setModalVisible(true)
                        setItemType("Haffus")
                      }}
                    >
                      <Text style={{fontSize: 18}}>Haffus</Text>
                    </Pressable>
                    <Text style={styles.cross}>X</Text>
                  </View>

                </View>
              </View>
              <View
                style={styles.button}
              >
                <View style={styles.buttonOuter}>
                  <View style={styles.buttonInner}>
                    <Pressable
                      onPress={()=>{
                      setModalVisible(true)
                      setItemType("Nilam")
                    }}
                    >
                      <Text style={{fontSize: 18}}>Nilam</Text>
                    </Pressable>
                    <Text style={styles.cross}>X</Text>
                  </View>

                </View>
              </View>
              <View
                style={styles.button}
              >
                <View style={styles.buttonOuter}>
                  <View style={styles.buttonInner}>
                    <Pressable
                        onPress={()=>{
                        setModalVisible(true)
                        setItemType("Daseri")
                      }}
                    >
                      <Text style={{fontSize: 18}}>Daseri</Text>
                    </Pressable>
                    <Text style={styles.cross}>X</Text>
                  </View>

                </View>
              </View>

        <View style={styles.EndBottons}>
          <Button 
          title="Reset"
          onPress={allReset}
          />

          <Button 
          title="Create Invoice"
          onPress={handleCreateInvoice}
          //onPress={printToFile}
          />
        </View>
        </ScrollView>
    </SafeAreaView>
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
      alignItems: "center",
      marginVertical: 50,
    },
    scrollViewModal: {
    },
    EndBottons : {
      margin: 20,
      width: "90%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
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
      justifyContent: "space-around"
    },
    buttonInner: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    cross: {
      fontSize: 18,
      backgroundColor: "grey",
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
      backgroundColor: "lightblue",
      height: 50,
      borderRadius:4,
      width: "90%",
      margin: 5,
    },
    PickerContainer:{
      marginTop:10,
      borderWidth:1,
      borderRadius:4,
      height:50
      
    },
  });
 
export default Home;