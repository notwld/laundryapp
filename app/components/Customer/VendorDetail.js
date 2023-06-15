import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const VendorDetail = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { vendor, user, token } = props.route.params;
    console.log(vendor);
    const filledStars = Math.floor(vendor.AverageRating);
    const emptyStars = 5 - filledStars;
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const handleLogout = async () => {
        await fetch(baseURL.URL + 'user/logout')
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'Logged Out!') {
                    navigation.navigate('Login');
                } else {
                    navigation.navigate('Login');
                }
            })
            .catch((err) => console.log(err));
    };
    return (
        <View>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/Logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                {/* Hamburger Menu */}
                <TouchableOpacity style={styles.menuIcon} onPress={toggleModal}>
                    <Ionicons name="menu" size={30} color="#000" />
                </TouchableOpacity>

            </View>
            <TouchableOpacity style={styles.container}>
                <LinearGradient colors={['#00CED1', '#00BFFF']} style={styles.gradientBackground}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="person" size={24} color="#fff" />
                        <Text style={styles.iconText}>Vendor: {vendor.Name}</Text>
                    </View>

                    <View style={styles.iconContainer}>
                        <Ionicons name="location" size={24} color="#fff" />
                        <Text style={styles.iconText}>Location: {vendor.Location}</Text>
                    </View>

                    <View style={styles.iconContainer}>
                        <Ionicons name="phone" size={24} color="#fff" />
                        <Text style={styles.iconText}>Phone: {vendor.Phone}</Text>
                    </View>

                    <View style={styles.iconContainer}>
                        <Ionicons name="mail" size={24} color="#fff" />
                        <Text style={styles.iconText}>Email: {vendor.Email}</Text>
                    </View>

                    <View style={styles.iconContainer}>
                        <Ionicons name="globe" size={24} color="#fff" />
                        <Text style={styles.iconText}>Website: {vendor.Website}</Text>
                    </View>

                    <View style={styles.iconContainer}>
                        <Ionicons name="clock" size={24} color="#fff" />
                        <Text style={styles.iconText}>Working Hours: {vendor.WorkingHours}</Text>
                    </View>

                    <View style={styles.iconContainer}>
                        <Ionicons name="checkmark" size={24} color="#fff" />
                        <Text style={styles.iconText}>
                            Delivery Available: {vendor.DeliveryAvailable ? 'Yes' : 'No'}
                        </Text>
                    </View>

                    <View style={styles.iconContainer}>
                        <Text style={styles.iconText}>Average Rating:</Text>
                        {[...Array(filledStars)].map((_, index) => (
                            <Ionicons key={index} name="star" size={16} color="#FFD700" />
                        ))}
                        {[...Array(emptyStars)].map((_, index) => (
                            <Ionicons key={index} name="star-outline" size={16} color="#FFD700" />
                        ))}
                    </View>

                    <Text style={styles.reviewsTitle}>Reviews:</Text>
                    {vendor.Reviews.map((review) => (
                        <View key={review.id} style={styles.reviewContainer}>
                            <View style={styles.ratingContainer}>
                                <Ionicons name="star" size={16} color="#FFD700" />
                                <Text style={styles.reviewRating}>{review.rating}</Text>
                            </View>
                            <Text style={styles.reviewComment}>{review.comment}</Text>
                        </View>
                    ))}

                    <TouchableOpacity style={styles.orderButton}>
                        <Text style={styles.orderButtonText}>Place Order</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </TouchableOpacity>
            <Modal visible={isModalOpen} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeIcon} onPress={toggleModal}>
                        <Ionicons name="close" size={30} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.profileButton}>
                        <Text style={[styles.buttonText, {
                            fontSize: 27,
                            fontWeight: 'bold',
                            marginBottom: 16,

                        }]}>Welcome {user.Username}!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.profileButton}>
                        <Text style={styles.buttonText}>View Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.profileButton}>
                        <Text style={styles.buttonText}>Your Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.profileButton}>
                        <Text style={styles.buttonText}>Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 7,
        paddingVertical: 10,
    },
    logo: {
        width: 75,
        height: 75,
    },
    searchInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#eee',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginLeft: 5,
        width: '100%',
    },
    menuIcon: {
        paddingHorizontal: 10,
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },

    gradientBackground: {
        padding: 16,
        borderRadius: 8,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    iconText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#fff',
    },
    reviewsTitle: {
        marginTop: 16,
        marginBottom: 8,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    reviewContainer: {
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewRating: {
        marginLeft: 4,
        fontSize: 14,
        color: '#fff',
    },
    reviewComment: {
        fontSize: 14,
        color: '#fff',
    },
    orderButton: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignSelf: 'center',
        marginTop: 16,
    },
    orderButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00CED1',
    },
    menuIcon: {
        paddingHorizontal: 10,
      },
      closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
      },
      profileButton: {
        marginBottom: 20,
      },
      buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
      },
      logoutText: {
        fontSize: 18,
        color: '#fff',
      },
});

export default VendorDetail;
``
