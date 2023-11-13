import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import colors from '../../assets/themes/colors';
import { LeaderboardProps } from '../../types';
import { onValue, ref } from 'firebase/database';
import { auth, db } from '../../config/firebaseConfig';
import { getFontSize } from '../../utils/getFontSize';


const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardProps[]>();
  
  const fetchLeaderboard = ()=> {
    const userRef = ref(db, `users`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      
      const userArray = Object.keys(data).map((key) => {
        const user = data[key];
        return {
          totalSteps: user.leaderboard.totalSteps,
          username: user.username,
        };
      });
      
      setLeaderboard(userArray.sort((a,b)=>b.totalSteps - a.totalSteps))
    }) 
  }

  useEffect(()=>{
    fetchLeaderboard();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      
      <View style={styles.list}>
        <FlatList 
          data={leaderboard}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.username}
          renderItem={({ item, index })=> 
            <View style={[styles.text_container, styles.list_container]}>
              <Text style={styles.text}>{index + 1}</Text>
              <Text style={styles.text}>{item.username}</Text>
              <Text style={styles.text}>{item.totalSteps}</Text>
            </View>
          }
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{ height: 20 }}
        />
      </View>
    </View>
  )
}

export default Leaderboard

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "4%",
    flex: 1
  },
  list: {
    marginTop: 10,
    flex: 1,
    shadowColor: colors.shadow,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  list_container: {
    marginVertical: "2%",
    paddingVertical: "15%",
    paddingHorizontal: "5%",
    borderRadius: 10,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  text_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  text: {
    fontFamily: "curlyBold",
    fontSize: getFontSize(0.045)
  }
})