import { StyleSheet, Button } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Form = () => {
    const [income, setIncome] = useState("")
    const [savings, setSavings] = useState("");
    const [spending, setSpending] = useState("");
    const [homePrice, setHomePrice] = useState("");
    const [futureSavings, setFutureSavings] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value
        const name = event.target.name;

        if(name === "income"){
            setIncome(value)
        } else if (name === "savings"){
            setSavings(value)
        } else if(name === "spending") {
            setSpending(value)
        } else if(name === "homePrice"){
            setHomePrice(value)
        } else if(name === "futureSavings") {
            setFutureSavings(value)
        } else {
            console.error("Error!")
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const data = {
            income,
            savings,
            spending,
            homePrice,
            futureSavings
        }

        event.preventDefault();

        const storeData = async () => {
            try {
              const jsonValue = JSON.stringify(data);
              await AsyncStorage.setItem('userData', jsonValue);
              console.log("Saved!")
            } catch (e) {
              // saving error
              console.log(e);
            }
          };

          storeData()

          setIncome("")
          setSavings("")
          setSpending("")
          setHomePrice("")
          setFutureSavings("")
    }
    
    return (
        <form style={styles.container} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='income'>What is your current income?</label>
                    <input
                        type="number"
                        step={0.1}
                        id="income"
                        name="income"
                        placeholder="Enter Income (Yearly Salary)"
                        onChange={handleChange}
                        style={styles.input}
                        value={income}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="savings">How much are you able to save in a month?</label>
                    <input 
                        type="number" 
                        step={0.1}
                        name="savings" 
                        id="savings" 
                        placeholder='Enter monthly savings (Estimate)' 
                        onChange={handleChange}
                        style={styles.input}
                        value={savings}
                        required
                    />
                </div>

                <div>
                    <label>How much are you spending every month?</label>
                    <input
                        type='number'
                        step={0.1}
                        name='spending'
                        id='spending'
                        placeholder='Enter monthly spending'
                        onChange={handleChange}
                        style={styles.input}
                        value={spending}
                        required
                    />
                </div>

                <div>
                    <label>How much is the price of the home you want?</label>
                    <input
                        type='number'
                        step={0.1}
                        name='homePrice'
                        id='homePrice'
                        placeholder='Enter the price of the house you are planning to buy'
                        onChange={handleChange}
                        style={styles.input}
                        value={homePrice}
                        required
                    />
                </div>
                <div>
                    <label>How much money do you want to have saved up in 10 years?</label>
                    <input
                        type='number'
                        step={0.1}
                        name='futureSavings'
                        id='futureSavings'
                        placeholder='Enter the amount of money you want saved up in 10 years'
                        onChange={handleChange}
                        style={styles.input}
                        value={futureSavings}
                        required
                    />
                </div>
                <button style={styles.btn}>Submit</button>
            </form>
    )
}

export default Form;



const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
    },
    inputContainer: {

    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 220
      },
    btn: {
        width: 70,
        height: 50,
        backgroundColor: '#43df5c',
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    reactLogo: {
      height: 178,
      width: 290,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
  });