import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Linking,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {actuatedNormalize, isTab} from '../utils/Scaling';
import {Image} from 'react-native';
import {
  facebookURL,
  linkedinURL,
  image1,
  image2,
  twitterURL,
  youtubeURL,
  image3,
  image4,
} from '../utils/Uri';
import {darkBlue, lightGreen, skyBlue, white} from '../utils/Color';
import Carousel from 'react-native-reanimated-carousel';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

const Testimonials = () => {
  const reviews = [
    {
      key: 1,
      image: image1,
      name: 'Tammy J. Perez',
      description:
        'Dr. Xander gets it. From his excellent treatment, curiosity, investigative mind and ability to connect, you know where you stand immediately and what next steps look like.',
    },
    {
      key: 2,
      image: image2,
      name: 'Sandra N. Dunlap',
      description:
        'Dr. Xander was terrific. Knowledgeable, sensitive, informative… I immediately felt at ease and felt confident in my receiving expert medical care. Staff was great, too. Walked away, very impressed with the overall experience. HIGHLY recommend.',
    },
    {
      key: 3,
      image: image3,
      name: 'Eleanor G. Hawkins',
      description:
        'Dr. Xander is a great doctor! He’s very understanding and listens to your concerns. He takes time with the patient to help them with their health issues! I highly recommend him to anyone looking for a specialist',
    },
    {
      key: 4,
      image: image4,
      name: 'Gregory J. Alvarez',
      description:
        'Dr. Xander did a great job with my first ever health exam. She explained everything to me in a very clear manner. She was also kind and friendly. All of the staff was great they were helpful, patient and helped with my insurance.',
    },
  ];
  const [toggleAutoPlay, setToggleAutoPlay] = useState(true);
  const width = Dimensions.get('window').width;
  const carouselRef = useRef<any>();
  // console.log('carouselRef', carouselRef);

  const scrollRight = () => {
    if (carouselRef?.current) {
      carouselRef.current.scrollTo({count: 1, animated: true});
    }
    setToggleAutoPlay(false);
  };
  const scrollLeft = () => {
    if (carouselRef?.current) {
      carouselRef.current.scrollTo({count: -1, animated: true});
    }
    setToggleAutoPlay(false);
  };
  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
  });
  return (
    <View style={styles.subContainer}>
      <View style={styles.card}>
        <Text style={styles.textLabel}>Testimonials</Text>

        <Carousel
          ref={carouselRef}
          loop
          width={width * 0.9}
          // height={500}
          autoPlay={toggleAutoPlay}
          data={reviews}
          scrollAnimationDuration={2000}
          onSnapToItem={index => index}
          renderItem={({item}) => (
            <View style={styles.CardStyle}>
              <Image source={{uri: item.image}} width={100} height={100} />
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.text2}>{item.description}</Text>

              <View style={styles.cardButtons}>
                <TouchableOpacity onPress={scrollLeft}>
                  <Entypo name="chevron-left" size={20} color={'#000'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={scrollRight}>
                  <Entypo name="chevron-right" size={20} color={'#000'} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <View style={styles.line} />
        </View>
        <View style={styles.social}>
          <Pressable
            onPress={() => Linking.openURL(youtubeURL)}
            style={styles.socialIcon}>
            <AntDesign
              name="youtube"
              size={20}
              color={white}
              style={styles.icon}
            />
          </Pressable>
          <Pressable
            onPress={() => Linking.openURL(twitterURL)}
            style={styles.socialIcon}>
            <FontAwesome6
              name="x-twitter"
              size={20}
              color={white}
              style={styles.icon}
            />
          </Pressable>
          <Pressable
            onPress={() => Linking.openURL(linkedinURL)}
            style={styles.socialIcon}>
            <FontAwesome6
              name="linkedin-in"
              size={20}
              color={white}
              style={styles.icon}
            />
          </Pressable>
          <Pressable
            onPress={() => Linking.openURL(facebookURL)}
            style={styles.socialIcon}>
            <FontAwesome6
              name="facebook-f"
              size={20}
              color={white}
              style={styles.icon}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    backgroundColor: skyBlue,
    width: '100%',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  card: {
    width: isTab() ? '80%' : '95%',
    alignSelf: 'center',
    flex: 0.69,
    marginTop: -15,
    backgroundColor: white,
    borderRadius: 20,
    padding: 10,
  },
  CardStyle: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 'auto',
    // gap: 10,
    backgroundColor: white,
    width: '90%',
    // height: '62%',
    // marginRight: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardButtons: {
    flexDirection: 'row',
    gap: '10%',
    marginTop: 5,
  },
  socialIcon: {
    backgroundColor: darkBlue,
    width: '12%',
    borderRadius: 90,
    padding: 10,
    marginTop: actuatedNormalize(13),
    alignSelf: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginVertical: 'auto',
  },
  social: {
    flexDirection: 'row',
    gap: 10,
    // marginTop: 30,
    alignSelf: 'center',
  },
  lineContainer: {
    // marginTop: 23
  },
  line: {
    backgroundColor: 'green',
    width: '95%',
    height: 1,
    alignSelf: 'center',
    marginVertical: isTab() ? actuatedNormalize(10) : 15,
  },
  subCard: {
    backgroundColor: darkBlue,
    width: '47%',
    borderWidth: 1,
    borderColor: lightGreen,
    // height: '35%',
    color: 'white',
    // borderRadius: 10,
    padding: 10,
    marginLeft: 'auto',
  },
  textLabel: {
    marginBottom: actuatedNormalize(12),
    marginTop: 10,
    fontSize: isTab() ? actuatedNormalize(14) : 24,
    fontWeight: '700',
    marginVertical: isTab() ? 'auto' : 0,
    marginLeft: isTab() ? 10 : 10,
    color: darkBlue,
  },
  text: {
    marginBottom: actuatedNormalize(12),
    marginTop: 10,
    fontSize: isTab() ? actuatedNormalize(14) : 24,
    fontWeight: '500',
    marginVertical: isTab() ? 'auto' : 0,
    marginLeft: isTab() ? 10 : 0,
    color: '#000',
  },
  text2: {
    marginBottom: actuatedNormalize(12),
    marginTop: 10,
    fontSize: isTab() ? actuatedNormalize(14) : 15,

    marginVertical: isTab() ? 'auto' : 0,
    marginLeft: isTab() ? 10 : 0,
    color: '#000',
  },
});
export default Testimonials;
