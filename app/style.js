import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  white: { backgroundColor: "#ffffff", margin: 5 },
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 2,
    margin: 3,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },

  searchBar: {
    width:Dimensions.get("screen").width - 30,
    marginTop: 7,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 27,
    elevation: 10,
  },

  card: {
    width: Dimensions.get("screen").width - 15,
    padding: 5,
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },

  logo: {
    height: 75,
    width: 75,
  },

  inputs: {
    width: Dimensions.get("screen").width - 40,
    backgroundColor: "#fff",
    margin: 10,
    padding: 5,
  },

  btn: {
    backgroundColor: 'skyblue',
    width: '30%',
    alignSelf: 'center',
    borderRadius: 30,
    margin: 5,
    marginTop:6,
    paddingVertical: 3,
  },

  addBtn: {
    backgroundColor: '#87CEFA',
    width: 50,
    margin: 5,
    padding: 5,
    borderRadius: 5,
    elevation: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  invalid: {
    color: 'red',
    // display: 'flex',
    // marginVertical: 3,
    // marginHorizontal: 55,
    marginRight: 170,
    // marginTop: 5,
  },

  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 2,
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    elevation: 7,
    bottom: 0,
  },

  row1: {
    display: "flex",
    padding: 2,
    flexDirection: "row",
    // justifyContent: "center",
  },

  badge: {
    top: 0,
    right: 6,
    bottom: 8,
    position: 'absolute',
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 2,
    margin: 2,
  },
});
