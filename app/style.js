import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 2,
    margin: 3,
  },

  searchBar: {
    marginTop: 7,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 27,
    elevation: 10,
  },

  card: {
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
    backgroundColor: 'white',
    margin: 10,
    padding: 5,
  },

  btn: {
    backgroundColor: 'skyblue',
    width: '30%',
    alignSelf: 'center',
    borderRadius: 30,
    margin: 5,
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
    display: 'flex',
    // marginVertical: 1,
    marginHorizontal: 15,
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
