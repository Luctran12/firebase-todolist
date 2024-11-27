import { StatusBar } from "expo-status-bar";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../config/FireBase";

export default function Home() {
  const [dataShow, setDataShow] = useState([]);
  const [name, setName] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);

  const add = async (name) => {
    try {
      const docRef = await addDoc(collection(db, "asdff"), {
        name: name,
        age: 20,
        createdAt: serverTimestamp(),
        dof: Date.now(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    readAll();
  };

  const readAll = async () => {
    try {
      const docRef = collection(db, "asdff");
      const q = query(docRef);
      const querySnapshot = await getDocs(q);
      setDataShow(querySnapshot.docs);
    } catch (err) {
      console.log("Error reading data:", err);
    }
  };

  const deleted = async (id) => {
    try {
      console.log("deletedoc", id)
      await deleteDoc(id);
      setModalVisible(false);
      readAll();
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };

  const update = async (id, newName) => {
    try {
      console.log("update",id);
      const docRef = id;
      await updateDoc(docRef, { name: newName });
      setModalVisible(false);
      readAll();
    } catch (err) {
      console.error("Error updating document:", err);
    }
  };

  useEffect(() => {
    readAll();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          borderWidth: 1,
          width: "100%",
          height: "6%",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "5%",
        }}
      >
        <Text style={{ color: "gray", fontSize: 18 }}>ITEM LIST</Text>
      </View>
      <FlatList
        data={dataShow}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedItem(item);
              setModalVisible(true);
            }}
          >
            <View style={{ margin: 10 }}>
              <Text>
                {item.data().name} - {item.data().ref}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Button onPress={() => setAddVisible(true)} title="Add item" />

      {/* Add Modal */}
      <Modal visible={addVisible} transparent={true}>
        <View style={{ justifyContent: "center", flex: 1 }}>
          <View
            style={{
              backgroundColor: "gray",
              alignSelf: "center",
              height: "30%",
              width: "90%",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "20%",
                marginBottom: "10%",
              }}
            >
              <TextInput
                style={{ borderWidth: 1, height: 40, width: 160 }}
                value={name}
                onChangeText={(text) => setName(text)}
              />
              <Button
                title="Add"
                onPress={() => {
                  add(name);
                  setAddVisible(false);
                  setName("");
                }}
              />
            </View>
          </View>
          <Button onPress={() => setAddVisible(false)} title="Back" />
        </View>
      </Modal>

      {/* Update/Delete Modal */}
      <Modal visible={modalVisible} transparent={true}>
        <View style={{ justifyContent: "center", flex: 1 }}>
          <View
            style={{
              backgroundColor: "white",
              alignSelf: "center",
              height: "30%",
              width: "90%",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Edit Item</Text>
            <TextInput
              style={{
                borderWidth: 1,
                height: 40,
                width: "100%",
                marginBottom: 20,
                padding: 10,
              }}
              placeholder="Enter new name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Button
              title="Update"
              onPress={() => {
                update(selectedItem.ref, name);
                setName("");
              }}
            />
            <Button
              title="Delete"
              color="red"
              onPress={() => deleted(selectedItem.ref)}
            />
          </View>
          <Button
            title="Close"
            onPress={() => {
              setModalVisible(false);
              setName("");
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: "10%",
    borderWidth: 1,
  },
});


