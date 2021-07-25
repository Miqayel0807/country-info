import CountryData from "../../Services/service";
import styles from './country.module.css'
import {TextField, Button, Card, CardContent, Typography} from "@material-ui/core";
import {useState} from "react";

const Country = () => {
    const Countries = new CountryData()

    const [countryName, setCountryName] = useState('')
    const [countryInfo, setCountryInfo] = useState([])

    const countryNameChange = (event) => {
        let {value} = event.target
        value = value.toUpperCase()
        setCountryName(value)
    }
    const keyPress = ({key, type}) => {
        if (type === 'keypress' && key === 'Enter') {
            search(countryName)
        }
    }
    const search = async (country) => {
        const countryInfo = await Countries.getData(country)
        if (countryInfo.data.country) {
            setCountryInfo(prevState => {
                const newArr = []
                newArr.push(countryInfo.data.country)
                return newArr
            })
        }
        setCountryName('')
    }
    const info = countryInfo.map(country => {
        return (
            <Card className={styles.card} key={country} variant="outlined">
                <CardContent>
                    <Typography className={styles.emoji} color="textSecondary" gutterBottom>
                        {country.emoji}
                    </Typography>
                    <Typography variant="h3" component="h2">
                        {country.name}
                    </Typography>
                    <Typography className={styles.native} component='p' color="textSecondary">
                        {country.native}
                    </Typography>
                    <Typography className={styles.text} variant="body2" component="p">
                        Capital : {country.capital}
                    </Typography>
                    <Typography className={styles.text} variant="body2" component="p">
                        Currency : {country.currency}
                    </Typography>
                    <Typography className={styles.text} variant="body2" component="p">
                        Language : {country.languages[0].name}
                    </Typography>
                </CardContent>
            </Card>
        )
    })
    return (
        <div className={styles.container}>
            <div>
                <h1>Country info</h1>
            </div>
            <div>
                <TextField
                    id="filled-textarea"
                    label="Enter country code"
                    placeholder="Ex: GB"
                    variant="filled"
                    onChange={countryNameChange}
                    value={countryName}
                    onKeyPress={(e,) => {
                        keyPress(e)
                    }}
                />
                <Button
                    className={styles.button}
                    onClick={() => search(countryName)}
                    variant="contained"
                    color="primary"
                >
                    Search
                </Button>
            </div>
            {!countryInfo.length ? <p>Please enter the country code</p> : info}
        </div>
    )
}

export default Country