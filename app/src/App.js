import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Linking,
  KeyboardAvoidingView,
} from 'react-native';
import SafariView from 'react-native-safari-view';
import ImagePicker from 'react-native-image-picker';
import Header from './components/Header';
import Einstein from './components/Einstein';
import Login from './components/Login';
import Home from './components/Home';
import Loading from './components/Loading';
import Results from './components/Results';
import Train from './components/Train';
import Footer from './components/Footer';
import phrases from './einsteinPhrases';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: { full_name: 'not logged in' },
      query: '',
      bodyStatus: 'train',
      // einsteinResults: {
      //   samples: [],
      //   mostPopular: {
      //     label: 'other',
      //     count: 0,
      //   },
      // },
      einsteinText: null,
      trainPhotowidth: null,
      setTrainPhotoWidth: null,
      scanning: 'test',

      einsteinResults: {"samples":[{"__typename":"GraphImage","id":"1592384371674793888","comments_disabled":false,"dimensions":{"height":640,"width":640},"gating_info":null,"media_preview":"ACoq22Iyfmxjtx/hTvMX1FOrHGoSHkbRnttY/r3q4xctiXJR3NbzF9RR5i+orJF/L/s/98tR9vl/2f8Avlqr2cvInnRs0Vjf2hL/ALP/AHy3+NA1Vu6jP1NHspBzo2D0rmdrKMEHI4xhs/4V01LmlCfJfS9xyjzHLZb+6f8Ax6l3N/dP/j1dRmjNa+2/u/iR7Pz/AAOWJYjG0j/vqm+TJ/db8j/hXVEnHHWkG71o9t5fiHs/MTacHk9evp7UuDnPbHT+tNz+8A/2T/MVFk7B/vj+dcxsT44HJ4/WjB5/T2qMk5b2X+lEZJRSep6/kaAJMHIP6etRlGJ+8RQpOG9m/wAKmoA//9k=","owner":{"id":"240954482"},"thumbnail_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/21227558_494613014236106_3681810282990010368_n.jpg","thumbnail_resources":[],"is_video":false,"code":"BYZSSYzj0eg","date":1504047031,"display_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/21227558_494613014236106_3681810282990010368_n.jpg","caption":"🤔🤔🤔","comments":{"count":0},"likes":{"count":37},"label":"web site, website, internet site, site","isGeneralImage":true},{"__typename":"GraphImage","id":"1594604845364159803","comments_disabled":false,"dimensions":{"height":750,"width":750},"gating_info":null,"media_preview":"ACoqz6WmlgOtIWeMhivB6bhx9cd/x4oGX7aEyoygcMMZPTP+fStwdBjpXL/2hP8A3sewAx/KlGoT7g+7JHHTgj0I7/zpNAdJ3P4UVTttQjm+9hG44J4P0P8AQ1exWb0KM2CCMEBQBnv1P1zUN5EWQg9V5H4f4irMJ5G7AJ7eg9Px6VPMFx2yOgGP++T9PWum9/RmHLbVvVM5WirEgaFmQdAfQdD9Rmq9QaCin729T+ZpgooGakt2BOQeUHHHqPfr14pH1HHEa49z/n+tZdOpp20JaTd2OlkaRtzcmmGlNIaQwFFJS0DP/9k=","owner":{"id":"240954482"},"thumbnail_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/21227709_345885915845716_63937833810788352_n.jpg","thumbnail_resources":[],"is_video":false,"code":"BYhLKiFDCU7","date":1504311732,"display_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/21227709_345885915845716_63937833810788352_n.jpg","caption":"got this sick jacket from bae. #todayisagoodday","comments":{"count":4},"likes":{"count":48},"label":"mortarboard","isGeneralImage":true},{"__typename":"GraphImage","id":"1586826994003188240","comments_disabled":false,"dimensions":{"height":1350,"width":1080},"gating_info":null,"media_preview":"ACEqu3E6wgE9z2rNF1J5hkAyOmPb6+tT3Fox+cHOO3NKhCx9OnHT/wDXWEFG3dllmJxcpu6c+tTY4xms20YrKU6KecVpZAOKxkrO3TcYuxaKZs+v5mip/r+tR/MiuZ2jTOM9j7VVEhRQ2ff/AD/hU8Ti8UhhgAjjPXv+VNkhRVMYHbIHetotR0a1EJZyBtxI+Zjn8OmKvLjHFU4IWgUtnJOMj0/GrBOzAJyDx+dRKzegIlyaKbgUVmBz8UrxHKHGevpUkUsjuSDlj1zVcVuYAAwK7JNLpuStRse/b83IFSIR/hn+lKOlO7CuZssKKkoqbgf/2Q==","owner":{"id":"240954482"},"thumbnail_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.135.1080.1080/20987213_356930694738588_1168838296923537408_n.jpg","thumbnail_resources":[],"is_video":false,"code":"BYFir5hj5oQ","date":1503384540,"display_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/20987213_356930694738588_1168838296923537408_n.jpg","caption":"😁","comments":{"count":5},"likes":{"count":68},"label":"tennis ball","isGeneralImage":true},{"__typename":"GraphImage","id":"1593117142462421453","comments_disabled":false,"dimensions":{"height":1080,"width":1080},"gating_info":null,"media_preview":"ACoqmW5hAw2/cDyevOT+hpxuoOOufQbifp0/lUcthiLzlbJPJHbk9j6jvn9KrQxsJFJ4Ayc5Pp0ypyCfWpvYFcstIs7BISyn+Ikke+McdAD261KixwsGkdtjBgNxJwRjnoOx9OtZbs7M8jLszjHpxx179OvfrUiu3moWJkORjcfQ5xnnii4WNXfCuPMO0Hno/P5qP0rPaRiTsLbc8cnp27+lXNQl8yPjOMg8444PTHrnnJqgvQfSne+wi2i7xy46n37ng8jn8PxpFt1TneBj29fqcfrU9m7OCiqBsJyxPqxOMYPPb/69JPdGH5WUNkEIQfl54PbPHpz9aVkO7K0sYdjESDgA5HY56HqPyNL9nGQ2TkdP5VVt2CEk9MAfrgVY+0ZOB2z/APW9MA/5zUvyFeT2JjGW4PP1/wDrmmbVHb/P5UxZ1IyTgkFTjPSnCRccdKEF2XrJJbfduQkMxPGM/wA+9Mv45bjbsQ4XPXGefx6VsUVYzlPKljB24DdPvLkc8454NOFnO2GKbsDGSRyOoOc8+mfTFdAVHoOpqdegosNO2xzMmnzEcIfoMfpzTksp9oyp6DuP8a6aiiwXP//Z","owner":{"id":"240954482"},"thumbnail_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/21224880_2358544487702994_4825951134982078464_n.jpg","thumbnail_resources":[],"is_video":false,"code":"BYb45myDtnN","date":1504134384,"display_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/21224880_2358544487702994_4825951134982078464_n.jpg","caption":"😂😂😂","comments":{"count":1},"likes":{"count":60},"label":"comic book","isGeneralImage":true},{"__typename":"GraphImage","id":"1537953213469985208","comments_disabled":false,"dimensions":{"height":1080,"width":1080},"gating_info":null,"media_preview":"ACoqz1k3SKegBHHpite2G1pJVJUE5Kggrnucdfx9zWADg1agnA3Iej8n/wCvQBoXsfnSI+5FAUZBPOM5z071ckUNjOMqMAjtn0/p+dYOMsAM8VdGCORzQTckkRosyoSzL0zg+3QcnilW+mwMhfy/+vVd5tkix4APXOOD7VoKFIBK8n2X/GqWgWTOa3U5HbdkE8jBqKnAkUhl2NyfX9af5hA9/rVZWpWNBI5f30m5z09Pb/PNaIV+zj8xWWvWrG4elMGZ1KKSlFBRIDTxUQqQUCHgVNUIqSmI/9k=","owner":{"id":"240954482"},"thumbnail_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/19122202_281792375617272_571626762316808192_n.jpg","thumbnail_resources":[],"is_video":false,"code":"BVX6EyaDIm4","date":1497558331,"display_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/19122202_281792375617272_571626762316808192_n.jpg","caption":"when u getting brain gains but cant forget about your other gains","comments":{"count":1},"likes":{"count":55},"label":"barbell","isGeneralImage":true},{"__typename":"GraphVideo","id":"1585384888470578061","comments_disabled":false,"dimensions":{"height":612,"width":612},"gating_info":null,"media_preview":"ACoqllfzBheAfaqBtFJ5JPtV0DPGc+w4qRVK/KPy61CRrcqwRCBgy/e9+2amlUyckn9P0ouZhBGW4LdFz/h7VDprvPneQFTj3JPPP0H0os+5N11GPF5f3s49gM/qak8uH/now9tn/wBekv8AMbg9VI4+orM3v61S8xPyNENIBvOcZ/z+FMuL7Z8qjn1q6r4HHGepPWsGfMrvIOQG6/pTRUpX2VhsjmQ5atDzRaooxlj82P0qskW6MOBk8kD2HWpx++2hhgjqc+pyP8PamTFO9yGSaa5PoPQcCpRYy4/h/wC+hWrFbxoTnvz/APqFT5j9D/n8aQ7GUJQCEBC5I57D3/8ArcVnNhflU5AJ59ajH3qVfvCgaWpeVYjGu3dvHBBHGMk8d89KupBkA8AdSD24/OqqdCe4I/rV1GJxz/Af50GkvdVkOV1xwM9Ov+efp0NS4f1x+NRQirBFBg2f/9k=","owner":{"id":"240954482"},"thumbnail_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e15/20968972_111435106198961_5248936041326313472_n.jpg","thumbnail_resources":[],"is_video":true,"code":"BYAaygFj6ON","date":1503212627,"display_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e15/20968972_111435106198961_5248936041326313472_n.jpg","video_views":219,"caption":"😍","comments":{"count":0},"likes":{"count":27},"label":"Egyptian cat","isGeneralImage":true},{"__typename":"GraphImage","id":"1549503825651338247","comments_disabled":false,"dimensions":{"height":1350,"width":1080},"gating_info":null,"media_preview":"ACEq2vuKMd/60gOfb/P1pTyAOTx2pVwB357Y/wA/j60gI2PPrn/Pv70pVj/nn/HPvTtwPB/DHr/SnIxzyOvemBVzRSUUAWkI/vYp5cf3h+VQBQB0zmkTaPlPHJ59R1HPOP8ACgA4Zjk9OR7/AP6vTv8AhSg4yAduMnOTj8jkH86cdo5wD7A5P5Y/nSA4GDjPrj15/wA+1AFTzD/dP5GipMtRQBY6Ln0GaVGDZwMdKVv9X+FRQdG+o/maAHOHCgjGDijnODjPX2ob+g/pTz978KkCruNFMoqgP//Z","owner":{"id":"240954482"},"thumbnail_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.135.1080.1080/19533985_267867203691231_4012852270377992192_n.jpg","thumbnail_resources":[],"is_video":false,"code":"BWA8YUSDowH","date":1498935271,"display_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/19533985_267867203691231_4012852270377992192_n.jpg","caption":"bae and i every night 😂😂","comments":{"count":0},"likes":{"count":65},"label":"comic book","isGeneralImage":true},{"__typename":"GraphSidecar","id":"1586421214770709470","comments_disabled":false,"dimensions":{"height":1080,"width":1080},"gating_info":null,"media_preview":null,"owner":{"id":"240954482"},"thumbnail_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/20986757_113080769358791_8218520792497913856_n.jpg","thumbnail_resources":[],"is_video":false,"code":"BYEGbCKjUPe","date":1503336167,"display_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/20986757_113080769358791_8218520792497913856_n.jpg","caption":"ah... yes the eclipse #nofilter #althoughsecondpichassolarfilter","comments":{"count":1},"likes":{"count":35},"label":"wing","isGeneralImage":true},{"__typename":"GraphImage","id":"1532901914932179684","comments_disabled":false,"dimensions":{"height":640,"width":640},"gating_info":null,"media_preview":"ACoqzrSYgBCECjJ3MuT/AJ9KtIUU8OhwP7nqSfz5/IVS3DgfnUJJPyryST+OaZdjYVlIC7oz06qT6+/0+ufakLKvV4xnqNntjj09/fmqptGiTJK7hztB5qsS2CGGPX6UrjsaIkUtyAwX0GM8VDj2H5Cq8R546Y/KroB9qTFYzJMqSvIxxyMGrumQhnLN/COPxpuqj9+T6gH+nFXrOPylx3ND2GWHsVdt2T+Jz+VVbuyZn+XpjpVmeZUBzv56FM8fj2qo91thZwzMeg3ev+eakrUzLZgkgz0zg1vfZ4z06dqxLWAyEHsOvrx6Vpm4UEjI496cn2IEWOO9Yy5JIwBngDv+PpUhBXs2R7f571T0g5nCnoVY47flV7VSYwNny5Pbjt7VQr9BrqG6+YPcDFQtbLOoJLgD26+/PWqSyuerH8zWzJwH/wB00DuyhchIkCkspAO3jqfQn09ax8mrt2xZEyc8HrVCmgP/2Q==","owner":{"id":"240954482"},"thumbnail_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/19050886_251722641899162_3319195467023122432_n.jpg","thumbnail_resources":[],"is_video":false,"code":"BVF9iuDDHLk","date":1496956169,"display_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/19050886_251722641899162_3319195467023122432_n.jpg","comments":{"count":1},"likes":{"count":43},"label":"run"},{"__typename":"GraphImage","id":"1524911579098578563","comments_disabled":false,"dimensions":{"height":1350,"width":1080},"gating_info":null,"media_preview":"ACEqxaXFSqhY8An6U7yW/ut+R/wqbmqjpchpKn8lv7rfkf8ACmtGV6gj6ii4cpHiin4opkk0e0H5iw/3f68ipC0f96T8h/8AFVHH167fwJz+VSEj/np+hquWL3b+RPPbT/P9Ew3R8/NJ+Q/+KpshU/dLH/ex+nJp2R/z0/Q01/Zt34EY/Ojlj0bD2l/6f+RDRRRQFxUI71Nlfb8qqCn01G4nG5Yyvt+VROR2qOkNDjbUXKGaKbRUlWP/2Q==","owner":{"id":"240954482"},"thumbnail_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.135.1080.1080/18809613_1402220513178130_3829084183288872960_n.jpg","thumbnail_resources":[],"is_video":false,"code":"BUpkwB6DP6D","date":1496003647,"display_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/18809613_1402220513178130_3829084183288872960_n.jpg","caption":"as an artist, i would say one factor to determine the level of success would be on how many girls would wanna take a picture in front it. I had to wait behind several girls for this photo... #thisonewasprettysuccessful","comments":{"count":2},"likes":{"count":63},"label":"coil, spiral, volute, whorl, helix","isGeneralImage":true},{"__typename":"GraphImage","id":"1524902765842464533","comments_disabled":false,"dimensions":{"height":1080,"width":1080},"gating_info":null,"media_preview":"ACoqlFPAqsz7aRLpm7DipKLoFTqM8VUgk8zOeoq8gqhCCinhRTttAjBlPBqvEev1/pU8vSoY1xn3qCy/adTV/DHG315qhaAjJ7GtJTgVZLDDbvbH61Ju+tMU1LQIxduanU8VFUgqUUSipS2BioVobr+VMRKGqXdVZalpDP/Z","owner":{"id":"240954482"},"thumbnail_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/18722706_1775677406076703_7936682809446367232_n.jpg","thumbnail_resources":[],"is_video":false,"code":"BUpivx7DP8V","date":1496002597,"display_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/18722706_1775677406076703_7936682809446367232_n.jpg","caption":"when u at sfmoma and cant tell if object is building fixture or actual art piece 😂😂","comments":{"count":0},"likes":{"count":38},"label":"switch, electric switch, electrical switch","isGeneralImage":true},{"__typename":"GraphImage","id":"1524201292649276607","comments_disabled":false,"dimensions":{"height":1080,"width":1080},"gating_info":null,"media_preview":"ACoqoTIqpkADkdBVB2yfStzyVkGGGQPr/SpBZRt/CPbr/jQMwI1qwo4raFlGOir+R/xqQWiDoq/l/wDXpFJ2Offpj14pu2uga2j/ALo/Km+Qn90flQK5BcnZET0yQKou5IGGz06ZrXeBZ1CsSADnim/2XGectx9P8KCSXzAh6OefTjj0z2p32gD+Fvyq0FPPJPPt+X0H507B/wA4pD3KBuR/dammdfRvyrQK1HtoEU3m8pQeOTjk4x159/pUlpcCXPI/z/kfyrMvOdv+6afZfeH+9SfcZsqwUcuD9f8A9dSeYvqPzpu0eg/KoXRfQflTAnLD1H50zIqm6j0FV8CgR//Z","owner":{"id":"240954482"},"thumbnail_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/18646386_446623515698621_2087497716677476352_n.jpg","thumbnail_resources":[],"is_video":false,"code":"BUnDQAGjSS_","date":1495918974,"display_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/18646386_446623515698621_2087497716677476352_n.jpg","caption":"SOMEBODY GIMMIE DAT HOUSE MUSIC","comments":{"count":0},"likes":{"count":19},"label":"web site, website, internet site, site","isGeneralImage":true}],"categoryCount":{"run":1},"mostPopular":{"label":"run","count":1}},
      scanning: {"__typename":"GraphImage","id":"1592384371674793888","comments_disabled":false,"dimensions":{"height":640,"width":640},"gating_info":null,"media_preview":"ACoq22Iyfmxjtx/hTvMX1FOrHGoSHkbRnttY/r3q4xctiXJR3NbzF9RR5i+orJF/L/s/98tR9vl/2f8Avlqr2cvInnRs0Vjf2hL/ALP/AHy3+NA1Vu6jP1NHspBzo2D0rmdrKMEHI4xhs/4V01LmlCfJfS9xyjzHLZb+6f8Ax6l3N/dP/j1dRmjNa+2/u/iR7Pz/AAOWJYjG0j/vqm+TJ/db8j/hXVEnHHWkG71o9t5fiHs/MTacHk9evp7UuDnPbHT+tNz+8A/2T/MVFk7B/vj+dcxsT44HJ4/WjB5/T2qMk5b2X+lEZJRSep6/kaAJMHIP6etRlGJ+8RQpOG9m/wAKmoA//9k=","owner":{"id":"240954482"},"thumbnail_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/21227558_494613014236106_3681810282990010368_n.jpg","thumbnail_resources":[],"is_video":false,"code":"BYZSSYzj0eg","date":1504047031,"display_src":"https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/21227558_494613014236106_3681810282990010368_n.jpg","caption":"🤔🤔🤔","comments":{"count":0},"likes":{"count":37},"label":"web site, website, internet site, site","isGeneralImage":true},
      user: {id: "240954482", username: "davidisturtle", profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/s150x150/11296795_485223351641943_1257523564_a.jpg", full_name: "David Oh", bio: "🍞🍇"},
    };
  }

  componentWillMount() {
    this.setTokenListener();
    this.fetchEinsteinToken();
    this.setEinsteinResponse();
  }

  showBody(body) {
    this.setState({
      bodyStatus: body,
    }, () => this.setEinsteinResponse());
  }

  updateQuery(query) {
    this.setState({ query });
  }

  setTokenListener() {
    Linking.addEventListener('url', (event) => {
      const token = event.url.split('token=')[1];

      this.fetchUserInfo(token)
        .then((results) => {
          this.setState({
            instaToken: token,
            bodyStatus: 'home',
            user: results.data,
          }, () => this.setEinsteinResponse());
          SafariView.dismiss();
        })
        .catch(error => console.log('setting token listener error: ', error));
    });
  }

  setTrainPhotoWidth(trainPhotowidth) {
    this.setState({ trainPhotowidth });
  }

  setLoading(username) {
    this.setState({
      bodyStatus: 'loading',
    }, () => this.setEinsteinResponse(username));
  }

  setEinsteinResults(data) {
    this.setState({
      einsteinResults: data,
      bodyStatus: 'results',
    }, () => this.setEinsteinResponse());
  }

  setEinsteinResponse(username) {
    const { user, einsteinResults, bodyStatus } = this.state;
    const { label } = einsteinResults.mostPopular;
    const firstName = user.full_name.split(' ')[0];
    const responses = {
      login: phrases.login,
      home: phrases.home(firstName),
      loading: phrases.loading(username),
      results: phrases.results(label),
      train: phrases.train(),
    };
    const response = responses[bodyStatus];
    const setCaretInt = () => {
      let set = true;
      const caret = {
        false: ' ',
        true: '_',
      };
      this.caretInterval = setInterval(() => {
        this.setState({
          einsteinText: response + caret[set],
        });
        set = !set;
      }, 300);
    };
    let counter = 0;

    clearInterval(this.caretInterval);
    clearInterval(this.typingInterval);
    this.typingInterval = setInterval(() => {
      this.setState({
        einsteinText: response.slice(0, counter),
      });
      counter += 1;
      if (counter > response.length) {
        clearInterval(this.typingInterval);
        setCaretInt();
      }
    }, 25);
  }

  authenticate() {
    fetch('https://floating-everglades-83969.herokuapp.com/api/auth', { method: 'POST' })
      .then(res => res.json())
      .then((json) => {
        SafariView.show({
          url: json.url,
          fromBottom: true,
        });
      })
      .catch(error => console.log('authentication error: ', error));
  }

  fetchEinsteinToken() {
    fetch('https://floating-everglades-83969.herokuapp.com/api/einstein/getToken')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          einsteinToken: data.token,
        });
      })
      .catch(error => console.log('fetching einstein token error: ', error));
  }

  fetchUserInfo(token) {
    return fetch(`https://api.instagram.com/v1/users/self/?access_token=${token}`)
      .then(res => res.json())
      .then(data => data)
      .catch(error => console.log('fetching user info error: ', error));
  }

  fetchUserData(username) {
    return fetch(`https://www.instagram.com/${username}/?__a=1`)
      .then(res => res.json())
      .then(data => data)
      .catch(error => console.log('fetching user id error: ', error));
  }

  einsteinPredict(sample) {
    const formData = new FormData();
    formData.append('numResults', 1);

    if (!sample.isGeneralImage) {
      // test against REI models:
      formData.append('modelId', 'DE6BIURXD7STLKA3S5LGGRFZ4Q');
    } else {
      // test against Salesforce's general image models:
      formData.append('modelId', 'GeneralImageClassifier');
    }

    if (sample.fromCamera) {
      formData.append('sampleBase64Content', sample.data);
    } else {
      formData.append('sampleLocation', sample.display_src);
    }

    this.setState({
      scanning: sample
    });

    return fetch('https://api.einstein.ai/v2/vision/predict', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.state.einsteinToken}`,
        'Cache-Control': 'no-cache',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(res => res.json())
      .then(data => data)
      .catch(error => console.error('einstein prediction error: ', error));
  }

  labelSamples(givenSamples) {
    const results = {
      samples: [],
      categoryCount: {},
      mostPopular: {
        label: 'other',
        count: 0,
      },
    };
    const { categoryCount, mostPopular, samples } = results;
    const einsteinQueue = [];
    const einsteinQueueGeneral = [];

    for (let i = 0; i < givenSamples.length; i++) {
      let sample = givenSamples[i];

      einsteinQueue.push(this.einsteinPredict(sample)
        .then((data) => {
          const { label } = data.probabilities[0];
          sample.label = label;

          if (label === 'other') {
            sample.isGeneralImage = true;
            // if an image doesn't match one of REI's model,
            // it will be queued again to be analyzed with Salesforce's GeneralImageClassifier
            einsteinQueueGeneral.push(this.einsteinPredict(sample)
              .then((generalData) => {
                sample.label = generalData.probabilities[0].label;
              }));
          } else {
            categoryCount[label] = categoryCount[label] + 1 || 1;
            if (categoryCount[label] > mostPopular.count) {
              mostPopular.count = categoryCount[label];
              mostPopular.label = label;
            }
          }
          samples.push(sample);
        })
        .catch(error => console.log('creating queue error: ', error)));
    }

    return Promise.all(einsteinQueue)
      .then(() => Promise.all(einsteinQueueGeneral))
      .then(() => results)
      .catch(error => console.log('queueing einstein calls error: ', error));
  }

  shopFor(username) {
    this.setLoading(username);
    this.fetchUserData(username)
      .then((data) => {
        if (!data) {
          throw userInvalid;
          return;
        }
        return this.labelSamples(data.user.media.nodes);
      })
      .then(data => this.setEinsteinResults(data))
      .catch(userInvalid => this.showBody('home'))
      .catch(error => console.log('shopping for error: ', error));
  }

  shopBasedOnPhoto() {
    const options = {
      quality: 0, // set low to meet 5mb limitation of Einstein API
    };

    ImagePicker.launchCamera(options, (response) => {
      if (response.data) {
        this.setLoading();
        response.fromCamera = true;
        this.labelSamples([response])
          .then((data) => {
            this.setEinsteinResults(data);
          });
      }
    });
  }

  render() {
    const {
      user,
      query,
      scanning,
      bodyStatus,
      einsteinText,
      trainPhotowidth,
      einsteinResults,
    } = this.state;

    const login = <Login
                    authenticate={this.authenticate.bind(this)}
                  />;
    const home = <Home
                  user={user}
                  query={query}
                  shopFor={this.shopFor.bind(this)}
                  updateQuery={this.updateQuery.bind(this)}
                  shopBasedOnPhoto={this.shopBasedOnPhoto.bind(this)}
                 />;
    const loading = <Loading scanning={scanning}/>;
    const results = <Results
                      showBody={this.showBody.bind(this)}
                      einsteinResults={einsteinResults}
                    />;
    const train = <Train
                    einsteinResults={einsteinResults}
                    trainPhotowidth={trainPhotowidth}
                    showBody={this.showBody.bind(this)}
                    setTrainPhotoWidth={this.setTrainPhotoWidth.bind(this)}
                  />;
    const bodies = {
      login, home, loading, results, train,
    };

    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.container}
      >
        <Header />
        <Einstein
          einsteinText={einsteinText}
        />
        <View style={styles.body}>
          {bodies[bodyStatus]}
        </View>
        <Footer />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(132, 91, 51, .8)',
  },
});

AppRegistry.registerComponent('blendedDates', () => App);
