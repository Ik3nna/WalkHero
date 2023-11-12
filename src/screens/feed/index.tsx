import { Dimensions, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Button from '../../components/button';
import colors from '../../assets/themes/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ACTIVITY } from '../../constants/routeName';
import { FeedProps } from '../../types';
import { onValue, ref, set } from 'firebase/database';
import { auth, db } from '../../config/firebaseConfig';
import Icon from '../../components/icons';
import { getFontSize } from '../../utils/getFontSize';

const { width, height } = Dimensions.get("window");

const Feed = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [feed, setFeed] = useState<FeedProps[]>();
  const currentUser = auth.currentUser;
  
  const fetchData = ()=> {
    const feedDataRef = ref(db, `users/${currentUser?.uid}/sessions`);
    onValue(feedDataRef, (snapshot) => {
      const data = snapshot.val();
      const dataArray:FeedProps[] = data ? Object.values(data) : [];
      
      setFeed(dataArray.sort((a, b)=>b.date - a.date).slice(0, 5));
    }) 
  }

  const deleteData = (date: number)=> {
    set(ref(db, `users/${currentUser?.uid}/sessions/${date}`), null)
  }

  const formatTime = (time: number) => {
    const dateObject = new Date(time);

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = dateObject.toLocaleDateString('en-US', { weekday: 'long' });

    // Get the hours, minutes, and seconds
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    // Format the time in 12-hour format with AM/PM
    return `${dayOfWeek} \nTime: ${(hours % 12) || 12}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds} ${hours >= 12 ? 'pm' : 'am'}`;
  }

  useEffect(()=>{
    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      
      <View style={styles.list}>
        <FlatList 
          data={feed}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.date.toString()}
          renderItem={({ item })=> 
            <View style={styles.list_container}>
              <View style={styles.text_container}>
                <Text style={styles.text}>{formatTime(item.date)}</Text>
                <Text style={styles.text}>Number of steps: {item.steps}</Text>
              </View>
              
              <TouchableOpacity onPress={()=>deleteData(item.date)}>
                <Icon type="mi" name="delete" size={40} color={colors.danger} />
              </TouchableOpacity>
            </View>
          }
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{ height: 20 }}
        />
      </View>
      
      <Button 
        title='Start walk'
        bgColor={colors.purple}
        color={colors.white}
        style={styles.btn}
        width={width - (0.08 * width)}
        onPress={()=>navigation.push(ACTIVITY)}
      />
    </View>
  )
}

export default Feed

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "4%",
    flex: 1
  },
  list: {
    marginTop: 10,
    flex: 1
  },
  btn: {
    marginBottom: "3%"
  },
  list_container: {
    marginVertical: "2%",
    paddingVertical: "7%",
    paddingHorizontal: "5%",
    borderRadius: 10,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  text_container: {
    flexDirection: "column",
    rowGap: 20
  },
  text: {
    fontFamily: "curlyBold",
    fontSize: getFontSize(0.045)
  }
})