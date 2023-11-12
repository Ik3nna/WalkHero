import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Pedometer } from 'expo-sensors';
import { getFontSize } from '../../utils/getFontSize'
import colors from '../../assets/themes/colors';
import Button from '../../components/button';
import { NavigationProps } from '../../types';
import { db, auth } from '../../config/firebaseConfig';
import { ref, update, set } from 'firebase/database';
import { useGlobalContext } from '../../context';

const Activity = ({ navigation }: NavigationProps) => {
  const [time, setTime] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const { prevStepCount, setPrevStepCount } = useGlobalContext();

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));
  
    if (isAvailable) {
      const subscription = Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps - prevStepCount);
      });
  
      return subscription;
    }
  }; 
  
  const formattedTime = (time: number) => {
    const seconds = time % 60;
    const minutes = Math.floor((time / 60) % 60);
    const hour = Math.floor((minutes / 60) % 60);

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedHour = hour < 10 ? `0${hour}` : hour;

    return `${formattedHour}:${formattedMinutes}:${formattedSeconds}`
  }

  const handleDone = async ()=> {
    setPrevStepCount((prev: number)=> prev + currentStepCount);
    const currentUser = auth.currentUser;
    const sessionId = Date.now();
    
    // update(ref(db, `users/${currentUser?.uid}/leaderboard`), {
    //     totalSteps: currentStepCount
    // });
    set(ref(db, `users/${currentUser?.uid}/sessions/${sessionId}`), {
      date: sessionId,
      time: formattedTime(time),
      steps: currentStepCount
    });

    navigation.goBack();
  }

  useEffect(() => {
    let subscription: any;

    const setUpSubscription = async ()=> {
      await subscribe();
    }

    setUpSubscription();

    return () => subscription && subscription.remove();
  }, []);

  useEffect(()=>{
    const Interval = setInterval(()=>{
      setTime(time + 1);
    }, 1000)

    return ()=> {
      clearInterval(Interval);
    }
  }, [time]);

  return (
    <View style={styles.container}>
      <Text style={styles.time_text}>Time</Text>

      <View>
        <Text style={styles.timer}>{formattedTime(time)}</Text>

        <View style={styles.line} />
      </View>

      <View style={styles.step_container}>
        <Text style={styles.time_text}>Steps</Text>
        <Text style={styles.timer}>{currentStepCount}</Text>
        <Button 
            title="DONE"
            bgColor={colors.purple}
            color={colors.white}
            style={styles.btn}
            onPress={()=>handleDone()}
        />
      </View>
    </View>
  )
}

export default Activity

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    time_text: {
        fontFamily: "normal",
        fontSize: getFontSize(0.09)
    },
    timer: {
        fontFamily: "curly",
        fontSize: getFontSize(0.15)
    },
    line: {
        height: 2,
        backgroundColor: colors.grey,
        marginVertical: "15%"
    },
    step_container: {
        alignItems: "center"
    },
    btn: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginVertical: "5%"
    }
})