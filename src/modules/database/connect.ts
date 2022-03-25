import { connect } from "mongoose"

export default function Connect() {
    connect(`${process.env.DB}`).then(() => {
        console.log(`Connect to database`)
    }).catch((err) => {
        console.log(`Failed to connect to database`)
        console.log(err)
    })
}