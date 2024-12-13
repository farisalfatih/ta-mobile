import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'; 
import Icon from 'react-native-vector-icons/FontAwesome';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 'Daily Specials',
      dailySpecials: [
        { id: 1, name: 'Mochaccino', price: 17000, image: require('../images/mochacinno.jpg') },
        { id: 2, name: 'Frappuccino', price: 18000, image: require('../images/frappucino.jpg') },
      ],
      moreSpecials: [
        { id: 1, name: 'Brown Sugar', price: 17000, image: require('../images/brownSugar.jpg') },
        { id: 2, name: 'Ice Latte', price: 15000, image: require('../images/iceLatte.jpg') },
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
    const { newName, newPrice, selectedCategory } = this.state;
    const newItem = {
      id: selectedCategory === 'Daily Specials' ? this.state.dailySpecials.length + 1 : this.state.moreSpecials.length + 1,
      name: newName,
      price: parseInt(newPrice),
      image: require('../images/logota.jpg'),
    };
    if (selectedCategory === 'Daily Specials') {
      this.setState({
        dailySpecials: [...this.state.dailySpecials, newItem],
        newName: '',
        newPrice: '',
      });
    } else {
      this.setState({
        moreSpecials: [...this.state.moreSpecials, newItem],
        newName: '',
        newPrice: '',
      });
    }
  };

  // Fungsi Hapus Item
  deleteItem = (id) => {
    const { selectedCategory } = this.state;
    if (selectedCategory === 'Daily Specials') {
      const filteredItems = this.state.dailySpecials.filter(item => item.id !== id);
      this.setState({ dailySpecials: filteredItems });
    } else {
      const filteredItems = this.state.moreSpecials.filter(item => item.id !== id);
      this.setState({ moreSpecials: filteredItems });
    }
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
    const { selectedCategory, newName, newPrice, editingItemId } = this.state;
    if (selectedCategory === 'Daily Specials') {
      const updatedItems = this.state.dailySpecials.map(item =>
        item.id === editingItemId ? { ...item, name: newName, price: parseInt(newPrice) } : item
      );
      this.setState({
        dailySpecials: updatedItems,
        newName: '',
        newPrice: '',
        isEdit: false,
        editingItemId: null,
      });
    } else {
      const updatedItems = this.state.moreSpecials.map(item =>
        item.id === editingItemId ? { ...item, name: newName, price: parseInt(newPrice) } : item
      );
      this.setState({
        moreSpecials: updatedItems,
        newName: '',
        newPrice: '',
        isEdit: false,
        editingItemId: null,
      });
    }
  };

  render() {
    const { selectedCategory, dailySpecials, moreSpecials, newName, newPrice, isEdit } = this.state;
    const items = selectedCategory === 'Daily Specials' ? dailySpecials : moreSpecials;

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>SecangkirCerita</Text>
          <Text style={styles.greeting}>Drink Menu</Text>
        </View>

      {/* Iklan Section */}
      <View style={styles.iklanContainer}>
          <Image
            source={require('../images/iklan.jpg')} 
            style={styles.iklanImage}
          />
        </View>

        {/* Category Selector */}
        <View style={styles.categorySelector}>
          <TouchableOpacity 
            onPress={() => this.setCategory('Daily Specials')} 
            style={[styles.categoryButton, selectedCategory === 'Daily Specials' && styles.selectedCategory]}
          >
            <Text style={styles.categoryText}>Daily Specials</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => this.setCategory('More Specials')} 
            style={[styles.categoryButton, selectedCategory === 'More Specials' && styles.selectedCategory]}
          >
            <Text style={styles.categoryText}>More Specials</Text>
          </TouchableOpacity>
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

        {/* Menu Items */}
        <ScrollView contentContainerStyle={styles.coffeeList}>
          {items.map((item) => (
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
  
  <TouchableOpacity
    onPress={() => this.props.navigation.navigate('Detail')}
  >
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
  iklanContainer: {
    alignItems: 'center',
  },
  iklanImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  categorySelector: {
  flexDirection: 'row',
  marginBottom: 20,
  justifyContent: 'center',
  marginTop: 20, 
},
  categoryButton: {
    backgroundColor: '#d4b895',
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#4e2e1f',
    marginHorizontal: 20,
  },
  selectedCategory: {
    backgroundColor: '#f3e0d1',
  },
  categoryText: {
    color: '#000',
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
