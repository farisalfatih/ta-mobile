import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'; 
import Icon from 'react-native-vector-icons/FontAwesome';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 'Cold Coffee',
      coffeeItems: [
        { id: 1, name: 'Mochaccino', price: 17000, image: require('../images/mochacinno.jpg') },
        { id: 2, name: 'Frappuccino', price: 18000, image: require('../images/frappucino.jpg') },
        { id: 3, name: 'Brown Sugar', price: 17000, image: require('../images/brownSugar.jpg') },
        { id: 4, name: 'Ice Latte', price: 15000, image: require('../images/iceLatte.jpg') },
      ],
      newName: '',
      newPrice: '',
      isEdit: false,
      editingItemId: null,
    };
  }

  setCategory(category) {
    this.setState({ selectedCategory: category });
  }

  // Fungsi Tambah Item
  addItem = () => {
    const { newName, newPrice, coffeeItems } = this.state;

    if (newName && newPrice) {
      const newItem = {
        id: coffeeItems.length + 1,
        name: newName,
        price: parseInt(newPrice),
        image: require('../images/logota.jpg'), 
      };
      this.setState({
        coffeeItems: [...coffeeItems, newItem],
        newName: '',
        newPrice: '',
      });
    } else {
      Alert.alert('Error', 'Name and price are required');
    }
  };

  // Fungsi Hapus Item
  deleteItem = (id) => {
    const filteredItems = this.state.coffeeItems.filter(item => item.id !== id);
    this.setState({ coffeeItems: filteredItems });
  };

  // Fungsi Edit Item
  startEditItem = (item) => {
    this.setState({
      newName: item.name,
      newPrice: item.price.toString(),
      isEdit: true,
      editingItemId: item.id,
    });
  };

  saveEditItem = () => {
    const { coffeeItems, newName, newPrice, editingItemId } = this.state;
    const updatedItems = coffeeItems.map(item =>
      item.id === editingItemId ? { ...item, name: newName, price: parseInt(newPrice) } : item
    );
    this.setState({
      coffeeItems: updatedItems,
      newName: '',
      newPrice: '',
      isEdit: false,
      editingItemId: null,
    });
  };

  render() {
    const { selectedCategory, coffeeItems, newName, newPrice, isEdit } = this.state;

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>SecangkirCerita</Text>
          <Text style={styles.greeting}>Drink Menu</Text>
        </View>

        {/* Input Form */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={newName}
            onChangeText={(text) => this.setState({ newName: text })}
          />
          <TextInput
            placeholder="Price"
            style={styles.input}
            value={newPrice}
            keyboardType="numeric"
            onChangeText={(text) => this.setState({ newPrice: text })}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={isEdit ? this.saveEditItem : this.addItem}
          >
            <Text style={{ color: '#fff' }}>{isEdit ? 'Save' : 'Add'}</Text>
          </TouchableOpacity>
        </View>

        {/* Coffee Items */}
        <ScrollView contentContainerStyle={styles.coffeeList}>
          {coffeeItems.map((item) => (
            <View key={item.id} style={styles.coffeeItem}>
              <TouchableOpacity 
                onPress={() => item.name === 'Frappuccino' && this.props.navigation.navigate('Detail1')} 
                style={styles.imageContainer}
              >
                <Image source={item.image} style={styles.coffeeImage} />
              </TouchableOpacity>
              <Text style={styles.coffeeTitle}>{item.name}</Text>
              <Text style={styles.coffeePrice}>Rp {item.price}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => this.startEditItem(item)}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => this.deleteItem(item.id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Footer Navigation */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <Icon name="home" size={30} color="#4e2e1f" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Icon name="list" size={30} color="#4e2e1f" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Icon name="heart" size={30} color="#4e2e1f" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => this.props.navigation.navigate('Detail2')}
          >
            <Icon name="shopping-cart" size={30} color="#4e2e1f" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Icon name="user" size={28} color="#4e2e1f" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e0d1',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4e2e1f',
    marginTop: 20,
  },
  greeting: {
    fontSize: 20,
    color: '#4e2e1f',
  },
  inputContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#4e2e1f',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  coffeeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  coffeeItem: {
    width: '45%',
    backgroundColor: '#d4b895',
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4e2e1f',
    padding: 20,
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  coffeeImage: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  coffeeTitle: {
    fontSize: 16,
    color: '#4e2e1f',
  },
  coffeePrice: {
    fontSize: 14,
    color: '#4e2e1f',
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  editButton: {
    backgroundColor: '#4e2e1f',
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#4e2e1f',
    padding: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerButton: {
    padding: 10,
  },
});
