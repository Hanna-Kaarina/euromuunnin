import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { Input } from 'react-native-elements';

export default function Valuutta() {
  //c785b97e590abf10f3f5d478f0fb4659 oma API Access Key
  const [rates, setRates] = useState([]);
  const [number, setNumber] = useState("");
  const [selected, setSelected] = useState("USD");
  const [result, setResult] = useState("0");

  const fetchRates = () => {
    fetch("http://api.exchangeratesapi.io/latest?access_key=c785b97e590abf10f3f5d478f0fb4659")
    .then(response => response.json())
    .then(data => setRates(data.rates))
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    fetchRates();
  }, [])

  const convert = () => {
    if (number == "") {
      setResult(0);
    } else {
      setResult((parseInt(number)/rates[selected]).toFixed(2));
    }
    setNumber("");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        style={styles.image}
        source={{
          uri: "https://media.istockphoto.com/photos/national-currency-top-view-of-mixed-american-dollars-banknotes-picture-id1212581566?b=1&k=20&m=1212581566&s=170667a&w=0&h=g9y7QC6fjoOZuUylfDJ9GtfqtJUyddBrkMpN2I9W7XM="
        }}
      />
      <Text style={{ fontSize: 22, marginBottom: "5%"}} >
        {result}€
      </Text>
      <View style={styles.row}>
        <Input
          style={styles.input}
          value={number}
          placeholder="0"
          keyboardType='numeric'
          onChangeText={input => setNumber(input)}
        />
        <Picker
          style={{width: 101}}
          mode="dropdown"
          selectedValue={selected}
          onValueChange={(itemValue, itemIndex) =>
            setSelected(itemValue)
          }>
          {Object.keys(rates).map((key) => 
            <Picker.Item
              label={key}
              value={key}
              key={key}
            />)}
        </Picker>
      </View>
      <Button onPress={convert} title="Muunna" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: "30%"
  },
  image: {
    width: 200,
    height: 160,
    marginBottom: 35,
  },
  input: {
    marginTop: 25,
    paddingLeft: 4,
    textAlign: "center"
  }
});