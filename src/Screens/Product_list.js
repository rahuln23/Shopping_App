import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Get_product_list_data} from '../Actions/Actions';
import {AirbnbRating, Avatar, Button, Rating} from 'react-native-elements';
import color from '../config/color/color.json';
import {Skeleton} from '@rneui/themed';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import Snackbar from 'react-native-snackbar';

const Product_list = () => {
  const navigation = useNavigation();
  const [product_list, setproduct_list] = useState([]);
  const [loading, setloading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isConnected, setIsConnected] = useState(true);
  const lastBackPressedTime = useRef(0);

  const skeleton_array = [1, 2, 3, 4, 5, 6, 7, 8];
  const getPrice = (total, discount) => {
    var totalValue = (total * (100 - discount)) / 100;
    return Math.abs(total - Math.abs(totalValue)).toFixed(2);
  };
  

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    Get_product_list_data(setloading, setproduct_list);
    return () => {
      unsubscribe();
    };
  }, [navigation, isConnected]);

  useFocusEffect(
    React.useCallback(() => {
      const handleBackPress = () => {
        const currentTime = new Date().getTime();
        const timeInterval = 2000;
        if (currentTime - lastBackPressedTime.current < timeInterval) {
          setTimeout(() => {
            BackHandler.exitApp();
          }, 1000); 
        } else {
          lastBackPressedTime.current = currentTime;
          Toast.show('Press back again to exit', Toast.SHORT);
        }
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress
      );
      return () => {
        backHandler.remove();
      };
    }, []),
  );

  const getUniqueCategories = products => {
    const categories = products?.map(product => product.category);
    return ['All', ...new Set(categories)];
  };
  const categories = getUniqueCategories(product_list);

  const filteredProducts =
    selectedCategory === 'All'
      ? product_list
      : product_list?.filter(product => product.category === selectedCategory);

  const _renderItem = ({item, index}) => {
    return (
      <Pressable
        key={index}
        onPress={() => {
          navigation.navigate('Product_details', {product_id: item.id});
        }}
        style={[
          styles.container,
          {marginBottom: filteredProducts.length - 1 == index ? '3%' : 10,
           marginTop: filteredProducts.length - 1 == index ? '1%' : 0
          },
        ]}>
        <View
          style={[styles.sub_container, {backgroundColor: color.White_color}]}>
          <View style={styles.avatar}>
            <Avatar
              size={100}
              containerStyle={{backgroundColor: 'transparent'}}
              imageProps={{resizeMode: 'contain'}}
              source={{uri: item.images[0]}}
            />
          </View>

          <View
            style={{
              width: '70%',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.main_text}>{item.title}</Text>
              <Rating
                type="custom"
                imageSize={13}
                readonly
                startingValue={item.rating}
                style={[styles.rating, {backgroundColor: 'red'}]}
              />
            </View>
            <View>
              {item.brand && (
                <Text style={styles.brandmain_text}>{item.brand}</Text>
              )}
              <Text style={styles.desc_text} numberOfLines={2}>
                {item.description}
              </Text>
              <View style={{flexDirection: 'row', marginTop: '2%'}}>
                <Text style={[styles.price_c, {}]}>
                  $
                  {Number(
                    item.price - getPrice(item.price, item.discountPercentage),
                  ).toFixed(1)}
                  {'  '}
                </Text>
                <Text
                  style={[
                    styles.price_c,
                    {textDecorationLine: 'line-through', color: color.grey},
                  ]}>
                  ${item.price}
                </Text>
                <Text style={[styles.price_c, {}]}>
                  {'  '}({item.discountPercentage}% Off)
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const renderSkeletonItem = () => (
    <View style={styles.skeletonItem}>
      <Skeleton style={styles.skeletonThumbnail} height={100} width={100} />
      <View style={styles.skeletonTextContainer}>
        <Skeleton style={styles.skeletonTitle} />
        <Skeleton style={styles.skeletonSubtitle} />
      </View>
    </View>
  );

  const renderSkeletonButtons = () => {
    return Array.from({length: 5}).map((_, index) => (
      <Skeleton
        key={index}
        height={40}
        width={80}
        style={styles.skeletonButton}
      />
    ));
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={color.Green} />
      {!isConnected ? (
        <View style={styles.lottieContainer}>
          <Avatar
            size={100}
            containerStyle={{backgroundColor: 'transparent'}}
            imageProps={{resizeMode: 'contain'}}
            source={require('../../assets/Images_animation/no_signal.png')}
          />
          <Text style={styles.offlineText}>No Internet Connection!</Text>
          <Text style={styles.offlineText_1}>
            Please check your internet Connection and try again.
          </Text>
          <Button 
          title={'Retry'}
          buttonStyle={{
            borderRadius: 20,
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: color.Green,
            paddingHorizontal: '5%',
            marginTop:'5%'
          }}
           titleStyle={{
            fontFamily: 'Poppins-Medium',
            fontSize: 15,
            textTransform: 'capitalize',
            color: color.Green,
          }}
          onPress={()=>{
            if(isConnected){
              Get_product_list_data(setloading, setproduct_list);
            }
            else{
              Snackbar.show({
                text: 'No Internet Connection!',
                duration: Snackbar.LENGTH_SHORT,
                fontFamily: 'Poppins-Regular',
                backgroundColor: color.Green,
              });
            }
          }}/>
        </View>
      ) : (
        <View style={styles.main_container}>
          <View style={styles.button_container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {!loading
                ? categories.map((cat_name, index) => {
                    return (
                      <>
                        <Button
                          key={index}
                          title={cat_name}
                          titleStyle={{
                            fontFamily: 'Poppins-Medium',
                            fontSize: 12,
                            textTransform: 'capitalize',
                            color:
                              selectedCategory == cat_name
                                ? color.White_color
                                : color.Green,
                          }}
                          onPress={() => setSelectedCategory(cat_name)}
                          buttonStyle={{
                            borderRadius: 20,
                            backgroundColor:
                              selectedCategory == cat_name
                                ? color.Green
                                : color.White_color,
                            borderWidth: 2,
                            borderColor: color.Green,
                            paddingHorizontal: 10,
                          }}
                          containerStyle={{
                            backgroundColor: 'transparent',
                            margin: 10,
                          }}
                          style={{marginBottom: '26%'}}
                        />
                      </>
                    );
                  })
                : renderSkeletonButtons()}
            </ScrollView>
          </View>

          <FlatList
            data={loading ? skeleton_array : filteredProducts}
            renderItem={loading ? renderSkeletonItem : _renderItem}
            key={index => index.toSting()}
            style={{marginBottom: 150}}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Product_list;
const styles = StyleSheet.create({
  main_container: {
    backgroundColor: color.White_color,
  },
  rating: {
    alignSelf: 'flex-start',
    marginVertical: 4,
  },
  container: {
    flex: 1,
    elevation: 4,
    backgroundColor: color.White_color,
    marginBottom: '2%',
  },
  sub_container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    marginRight: '5%',
  },
  main_text: {
    fontFamily: 'Poppins-Medium',
    color: color.Green,
    fontSize: 15,
    width: '75%',
  },
  opt_text: {
    fontFamily: 'Poppins-Medium',
    color: color.Green,
    fontSize: 15,
  },
  brandmain_text: {
    fontFamily: 'Poppins-Medium',
    color: color.grey,
    fontSize: 12,
    width: '75%',
  },
  desc_text: {
    fontFamily: 'Poppins-Light',
    color: color.Black_color,
    fontSize: 10,
    width: '85%',
  },
  price_c: {
    fontFamily: 'Poppins-Medium',
    color: color.Black_color,
    fontSize: 13,
  },
  skeletonItem: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    backgroundColor: color.White_color,
    borderRadius: 8,
    alignItems: 'center',
  },
  skeletonThumbnail: {
    marginRight: 10,
  },
  skeletonTextContainer: {
    flex: 1,
  },
  skeletonTitle: {
    width: '80%',
    height: 20,
    marginBottom: 6,
  },
  skeletonSubtitle: {
    width: '60%',
    height: 16,
  },
  skeletonButton: {
    margin: 10,
    borderRadius: 20,
  },
  lottieContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 200,
  },
  offlineText: {
    fontSize: 18,
    color: color.Green,
    marginTop: 10,
    fontFamily: 'Poppins-Medium',
  },
  offlineText_1: {
    fontSize: 11,
    color: color.Green,
    fontFamily: 'Poppins-Medium',
  },
  button_container:
  {flexDirection: 'row',
   justifyContent: 'space-evenly', 
   borderWidth:0.2, 
   borderColor:color.Green, 
   elevation:5, 
    backgroundColor:color.White_color
  },
  itemContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  itemName: {
    fontSize: 14,
    textAlign: 'center',
  },
});
