import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import baseURL from '../../baseURL';
import { Picker } from '@react-native-picker/picker';


const VendorDetail = (props) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [specializationRates, setSpecializationRates] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [tax, setTax] = useState(5);
    console.log(specializationRates);
    const calculateTotalCost = () => {
        let cost = quantity * specializationRates;
        cost += cost * tax / 100;
        setTotalCost(cost);
    };
    const handleQuantityChange = (value) => {
        setQuantity(value);
        calculateTotalCost()
    };

    const handleItemChange = (item) => {
        const updatedItems = selectedItems.includes(item)
            ? selectedItems.filter((selectedItem) => selectedItem !== item)
            : [...selectedItems, item];
        setSelectedItems(updatedItems);
        calculateTotalCost()
        console.log(selectedItems, totalCost);


    };

    const { vendor, user, token, specializations } = props.route.params;
    console.log(specializations);
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
            <Modal visible={isFormOpen} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeIcon} onPress={() => {
                        setIsFormOpen(false)
                    }}>
                        <Ionicons name="close" size={30} color="#fff" />
                    </TouchableOpacity>

                    <View style={styles.formContainer}>
                        <Text style={styles.formLabel}>Quantity:</Text>
                        <TextInput
                            style={styles.formInput}
                            value={quantity}
                            onChangeText={handleQuantityChange}
                            keyboardType="numeric"
                        />

                        <View style={styles.formLabel}>
                            {Array.from({ length: quantity }).map((_, index) => (
                                <View style={styles.pickerContainer} key={index}>
                                    <Text style={styles.formLabel}>Item {index + 1}:</Text>
                                    <Picker
                                        style={styles.pickerInput}
                                        selectedValue={selectedItems[index]}
                                        onValueChange={(item) => handleItemChange(item, index)}
                                        mode="dropdown"
                                    >
                                        <Picker.Item label="Shalwar" value="Shalwar" />
                                        <Picker.Item label="Kameez" value="Kameez" />

                                        <Picker.Item label="Pant" value="Pant" />
                                        <Picker.Item label="Shirt" value="Shirt" />
                                        <Picker.Item label="Jeans" value="Jeans" />

                                    </Picker>
                                </View>
                            ))}

                        </View>

                        <View style={styles.totalCostContainer}>
                            <Text style={styles.totalCostText}>Total Cost: {totalCost}</Text>
                            <Text style={styles.totalCostText}>Tax: {tax}%</Text>
                        </View>

                        <TouchableOpacity style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Confirm Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
                        <Ionicons name="list" size={20} color="#fff" />
                        <Text style={styles.iconText}>
                            Specialized in {specializations
                                .filter(
                                    (specialization) => {
                                        specialization.vendorVendorID === vendor.VendorID
                                    }
                                )
                                .map((specialization) => {
                                    setSpecializationRates(specialization.Rate);
                                    specialization.Name
                                })
                                .join(', ')}
                        </Text>
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


                    <TouchableOpacity style={styles.orderButton} onPress={() => [
                        setIsFormOpen(true),
                    ]}>
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
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 56,

    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 7,
        paddingVertical: 10,
    },
    totalCostContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 7,
        paddingVertical: 10,
    },
    totalCostText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalCost: {
        fontSize: 16,
        fontWeight: 'bold',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        width: '80%',
        marginBottom: 16,
    },
    formLabel: {
        fontSize: 16,
        marginBottom: 8,
    },
    formInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
    },
    submitButton: {
        backgroundColor: '#00CED1',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});

export default VendorDetail;
``
