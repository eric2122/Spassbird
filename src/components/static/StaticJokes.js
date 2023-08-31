import React ,{useState , useEffect} from 'react';
import { listContacts } from '../../graphql/queries';
import {API , graphqlOperation} from 'aws-amplify' ;

import { PieChart, Pie,CartesianGrid, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from 'recharts';


export default function StaticJokes() {
    const [contacts, setContacts] = useState([]);
    



      const getContacts = async() => {
        try {
            const contactsData = await API.graphql(graphqlOperation(listContacts));
            console.log(contactsData);

            const contactsList = contactsData.data.listContacts.items;
            setContacts(contactsList);

           
        } catch(err) {
            console.log('error', err);
        }
    }

    useEffect(() => {
        getContacts()
    }, []);


  return (
   
        
    <div >
      <h1 style={{textAlign:"center"}}> Top Ten </h1>
          <div style={{textAlign:"center"}} >
         <BarChart
          width={500}
          height={300}
          data={contacts}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="cell" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
          </div>
    </div>
  )
};
