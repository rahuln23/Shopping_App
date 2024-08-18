import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Get_product_details} from '../Actions/Actions';
import ImageView from 'react-native-image-viewing';
import color from '../config/color/color.json';
import {AirbnbRating} from 'react-native-ratings';
import {Rating} from 'react-native-elements';
import {Skeleton } from '@rneui/themed';

import moment from 'moment';

const width = Dimensions.get('window').width;

const Product_details = ({navigation, route}) => {
  const {product_id} = route.params;
  const [product_details, setproduct_data] = useState([]);
  const [loading, setloading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [selected_image, setselected_image] = useState('');

  useEffect(() => {
    Get_product_details(product_id, setloading, setproduct_data);
  }, [navigation]);

  const getPrice = (total, discount) => {
    var totalValue = (total * (100 - discount)) / 100;
    return Math.abs(total - Math.abs(totalValue)).toFixed(2);
  };

  const render_skeleton =()=>{
    return(
      <ScrollView showsVerticalScrollIndicator={false}>
      {/* Skeleton Product Image */}
      <Skeleton style={styles.skeletonImage} />

      {/* Skeleton Product Details */}
      <View style={styles.skeletonTitleContainer}>
        <Skeleton style={styles.skeletonTitle} />
        <Skeleton style={styles.skeletonBrand} />
        <Skeleton style={styles.skeletonCategory} />
        <Skeleton style={styles.skeletonDescription} />
        <View style={styles.skeletonPriceContainer}>
          <Skeleton style={styles.skeletonPrice} />
          <Skeleton style={styles.skeletonPriceLineThrough} />
          <Skeleton style={styles.skeletonDiscount} />
        </View>
      </View>

      {/* Skeleton Dimensions */}
      <View style={styles.skeletonDimensionsContainer}>
        <Skeleton style={styles.skeletonTextLine} />
        <Skeleton style={styles.skeletonTextLine} />
        <Skeleton style={styles.skeletonTextLine} />
      </View>

      {/* Skeleton Reviews */}
      <View style={styles.skeletonReviewContainer}>
        <Skeleton style={styles.skeletonReviewTitle} />
        <Skeleton style={styles.skeletonReviewTextLine} />
        <Skeleton style={styles.skeletonReviewTextLine} />
        <Skeleton style={styles.skeletonReviewDate} />
      </View>
    </ScrollView>
    )
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={color.Green} />
      <ImageView
        images={selected_image}
        imageIndex={0}
        visible={isVisible}
        backgroundColor={color.White_color}
        swipeToCloseEnabled
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      />
      {!loading ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/*Product Image */}
          <Pressable
            style={styles.image_container}
            onPress={() => {
              const images = {
                uri: product_details?.images[0],
              };
              setselected_image([images]);
              setIsVisible(true);
            }}>
            <Image
              resizeMode={'contain'}
              source={{uri: product_details.images[0]}}
              style={{width: width, height: width / 1.3}}
            />
          </Pressable>

          {/* Product Details */}
          <View style={styles.title_container}>
            <View style={styles.main_rating_container}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.title}>{product_details.title}</Text>

                <Rating
                  imageSize={13}
                  readonly
                  startingValue={product_details.rating}
                  style={styles.rating}
                />
              </View>
              {product_details.brand && (
                <Text style={styles.review_main_text}>
                  Brand: {product_details.brand}
                </Text>
              )}

              {product_details.category && (
                <Text
                  style={[
                    styles.desc_text,
                    {textTransform: 'capitalize', fontFamily: 'Poppins-Medium'},
                  ]}>
                  Category: {product_details.category}
                </Text>
              )}
            </View>
            <View>
              <Text style={styles.desc_text}>
                {product_details.description}
              </Text>
              <View style={{flexDirection: 'row', marginTop: '2%'}}>
                <Text style={[styles.price_c, {}]}>
                  $
                  {Number(
                    product_details.price -
                      getPrice(
                        product_details.price,
                        product_details.discountPercentage,
                      ),
                  ).toFixed(1)}
                  {'  '}
                </Text>
                <Text
                  style={[
                    styles.price_c,
                    {textDecorationLine: 'line-through'},
                  ]}>
                  ${product_details.price}
                </Text>
                <Text style={[styles.price_c, {}]}>
                  {'  '}({product_details.discountPercentage}% Off)
                </Text>
              </View>
            </View>
          </View>

          {/* Dimensions */}
          <View style={styles.dimensions_container}>
            <Text>Availablity Status</Text>
            <View style={{marginHorizontal: '2%', marginTop:'2%'}}>
              <Text style={styles.dim_names}>
                &#x2022; Available: {product_details.stock}
              </Text>
              <Text style={[styles.sub_names,{color:color.Black_color}]}>
                &#x2022; Details: <Text style={{color:product_details.stock < 6 ? '#FFA500': '#50C878', fontFamily:'Poppins-Medium'}}>{product_details.availabilityStatus}</Text>
              </Text>
          
            </View>
          </View>

          {/* Dimensions */}
          <View style={styles.dimensions_container}>
            {product_details.dimensions && (
              <View>
                <Text style={styles.review_main_text}>Dimensions</Text>
                <View style={{marginHorizontal: '2%'}}>
                  <Text style={styles.dim_names}>
                    &#x2022; Height: {product_details.dimensions?.height} cm
                  </Text>
                  <Text style={styles.dim_names}>
                    &#x2022; width: {product_details.dimensions?.width} cm
                  </Text>
                  <Text style={styles.dim_names}>
                    &#x2022; Depth: {product_details.dimensions?.height} cm
                  </Text>
                </View>
              </View>
            )}
            <Text style={styles.review_main_text}>Other Details</Text>
            <View style={{marginHorizontal: '2%'}}>
              <Text style={styles.dim_names}>
                &#x2022; warranty: {product_details.warrantyInformation}
              </Text>
              <Text style={styles.dim_names}>
                &#x2022; Return Policy: {product_details.returnPolicy}
              </Text>
              <Text style={styles.dim_names}>
                &#x2022; minimum Order Quantity:{' '}
                {product_details.minimumOrderQuantity} Piecs
              </Text>
            </View>
          </View>

          {/*Other Details */}

          {/* Review */}
          {product_details.reviews && (
            <View style={styles.main_container_review}>
              <Text style={styles.review_main_text}>Customer Reviews</Text>
              {product_details.reviews.map(review => {
                return (
                  <View style={styles.reviewContainer}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.reviewerName}>
                        {review.reviewerName}
                      </Text>
                      <Rating
                        imageSize={14}
                        readonly
                        startingValue={review.rating}
                        style={styles.rating}
                      />
                    </View>
                    <Text style={styles.comment}>{review.comment}</Text>
                    <Text style={styles.date}>
                      {moment(review.date).format('MMMM Do, YYYY')}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      ) : (
        render_skeleton()
      )}
    </SafeAreaView>
  );
};

export default Product_details;
const styles = StyleSheet.create({
  image_container: {
    elevation: 5,
    backgroundColor: color.White_color,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    color: color.Green,
    fontSize: 16,
  },
  title_container: {
    elevation: 5,
    backgroundColor: color.White_color,
    marginTop: '1%',
    width: width,
    paddingHorizontal: '2%',
  },
  main_rating_container: {
    justifyContent: 'space-between',
  },
  dimensions_container: {
    backgroundColor: color.White_color,
    elevation: 5,
    marginTop: '1%',
    padding: '2%',
  },
  main_container_review: {
    marginTop: '1%',
    backgroundColor: color.White_color,
    paddingHorizontal: '2%',
  },
  review_main_text: {
    fontFamily: 'Poppins-Medium',
  },
  Basic_main_text: {
    fontFamily: 'Poppins-Medium',
  },
  desc_text: {
    fontFamily: 'Poppins-Light',
    color: color.Black_color,
    fontSize: 10,
    width: '85%',
  },
  container: {
    padding: 16,
  },
  reviewContainer: {
    borderBottomWidth: 1,
    borderBottomColor: color.light_grey,
    paddingVertical: 12,
    elevation: 5,
    backgroundColor: color.White_color,
    paddingHorizontal: '2%',
  },
  reviewerName: {
    fontSize: 13,
    color: color.Black_color,
    fontFamily: 'Poppins-Medium',
  },
  dim_names: {
    fontSize: 10,
    color: color.Black_color,
    fontFamily: 'Poppins-Medium',
  },
  sub_names: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },
  rating: {
    alignSelf: 'flex-start',
    marginVertical: 4,
    backgroundColor: 'transparent',
  },
  comment: {
    fontSize: 12,
    color: color.grey,
    fontFamily: 'Poppins-Light',
  },
  date: {
    fontSize: 12,
    color: '#777',
  },
  price_c: {
    fontFamily: 'Poppins-Medium',
    color: color.Black_color,
    fontSize: 14,
  },
  skeletonImage: {
    width: width,
    height: width / 1.3,
    borderRadius: 8,
    marginVertical: 8,
  },
  skeletonTitleContainer: {
    paddingHorizontal: '2%',
    paddingVertical: 16,
  },
  skeletonTitle: {
    width: '60%',
    height: 20,
    marginBottom: 8,
  },
  skeletonBrand: {
    width: '40%',
    height: 15,
    marginBottom: 8,
  },
  skeletonCategory: {
    width: '30%',
    height: 15,
    marginBottom: 16,
  },
  skeletonDescription: {
    width: '100%',
    height: 50,
    marginBottom: 8,
  },
  skeletonPriceContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  skeletonPrice: {
    width: '30%',
    height: 20,
    marginRight: 8,
  },
  skeletonPriceLineThrough: {
    width: '30%',
    height: 20,
    marginRight: 8,
  },
  skeletonDiscount: {
    width: '20%',
    height: 20,
  },
  skeletonDimensionsContainer: {
    marginVertical: 16,
    paddingHorizontal: '2%',
  },
  skeletonTextLine: {
    width: '80%',
    height: 15,
    marginBottom: 8,
  },
  skeletonReviewContainer: {
    paddingHorizontal: '2%',
    paddingVertical: 16,
  },
  skeletonReviewTitle: {
    width: '50%',
    height: 20,
    marginBottom: 16,
  },
  skeletonReviewTextLine: {
    width: '100%',
    height: 15,
    marginBottom: 8,
  },
  skeletonReviewDate: {
    width: '30%',
    height: 15,
  },
});
