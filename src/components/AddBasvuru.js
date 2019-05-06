import React, { Component } from "react";
import posed from "react-pose";
import UserConsumer from "../context";
const Animation = posed.div({
  visible: {
    opacity: 1,
    applyAtStart: {
      display: "block"
    }
  },
  hidden: {
    opacity: 0,
    applyAtEnd: {
      display: "none"
    }
  }
});

class AddBasvuru extends Component {
  state = {
    visible: false,
    isim: "",
    tc: "",
    adres: "",
    telefon: "",
    lokumcuBabaTercihSebebi: "",
    eklemek: "",
    yatırım: "",
    posta: "",
    dogum_tarihi: "",
    lokumcuBabaAcmaYeriniz: "",
    perakendeTicaret: "",
    error: false
  };
  //başvuru formunu açıp kapatmamız için yazıldı
  changeVisibility = e => {
    this.setState({
      visible: !this.state.visible
    });
  };

  //girilmesi zorunlu olan yerleri yazdık
  validateFrom = e => {
    const { isim, adres, telefon, tc } = this.state;
    if (isim === "" || adres === "" || telefon === "" || tc === "") {
      return false;
    }
    return true;
  };
  //inputlarımızın içerisine değer girmemizi sağladık
  changeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  //sayfa yenilemeyi önlemek preventDefault kullandık
  //addUser fonksiyonumula yeni yeni basvuru ekliyoruz
  addUser = async (dispatch, e) => {
    e.preventDefault();
    const {
      isim,
      tc,
      adres,
      telefon,
      posta,
      dogum_tarihi,
      perakendeTicaret,
      lokumcuBabaAcmaYeriniz,
      lokumcuBabaTercihSebebi,
      yatırım,
      eklemek
    } = this.state;
    const newUser = {
      isim,
      tc,
      adres,
      telefon,
      posta,
      dogum_tarihi,
      perakendeTicaret,
      lokumcuBabaAcmaYeriniz,
      lokumcuBabaTercihSebebi,
      yatırım,
      eklemek
    };

    if (!this.validateFrom()) {
      this.setState({
        error: true
      });
      return;
    }
    fetch("http://localhost:8080/api/basvuru", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    });
    //yeni kullanıcı eklerken inputların içerisini boşaltıyoruz
    this.setState({
      isim: "",
      tc: "",
      adres: "",
      telefon: "",
      lokumcuBabaTercihSebebi: "",
      eklemek: "",
      yatırım: "",
      posta: "",
      dogum_tarihi: "",
      lokumcuBabaAcmaYeriniz: "",
      perakendeTicaret: ""
    });
  };
  render() {
    const {
      error,
      visible,
      isim,
      tc,
      adres,
      telefon,
      posta,
      dogum_tarihi,
      perakendeTicaret,
      lokumcuBabaAcmaYeriniz,
      lokumcuBabaTercihSebebi,
      yatırım,
      eklemek
    } = this.state;
    return (
      <UserConsumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="col-md-12  bg-info  mb-8">
              <div className="card">
                <div className="card-header">
                  <h4 style={{ color: "red" }}>BAYİLİK ÖN BAŞVURU FORMU</h4>
                </div>
                <button
                  onClick={this.changeVisibility}
                  className="btn btn-dark btn-block  mb-2"
                >
                  {visible ? "Başvuru Formunu Kapat" : "Başvuru Formunu Aç"}
                </button>
                <Animation pose={visible ? "visible" : "hidden"}>
                  <div className="card-body">
                    {error ? (
                      <div className="alert alert-danger">
                        (*)Zorunlu Alanları Doldurunuz
                      </div>
                    ) : null}
                    <form onSubmit={this.addUser.bind(this, dispatch)}>
                      <div className="form-row">
                        <div className="col">
                          <label htmlFor="name">* İSİM SOYİSİM:</label>
                          <input
                            type="text"
                            name="isim"
                            id="isim"
                            placeholder="İsim Soyisim Giriniz"
                            className="form-control"
                            value={isim}
                            onChange={this.changeInput}
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="name">* TC KİMLİK:</label>
                          <input
                            required=""
                            type="text"
                            pattern="\d*"
                            maxLength="11"
                            minLength="11"
                            name="tc"
                            id="tc"
                            placeholder="Sayı Giriniz"
                            className="form-control"
                            value={tc}
                            onChange={this.changeInput}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col">
                          <label htmlFor="name">* ADRES: </label>
                          <textarea
                            type="text"
                            name="adres"
                            id="adres"
                            placeholder="Adresinizi Giriniz"
                            className="form-control"
                            value={adres}
                            onChange={this.changeInput}
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="name">* TELEFON: </label>
                          <input
                            type="text"
                            name="telefon"
                            pattern="\d*"
                            minLength="11"
                            maxLength="11"
                            id="telefon"
                            placeholder="Sayı Giriniz"
                            className="form-control"
                            value={telefon}
                            onChange={this.changeInput}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <label htmlFor="name">E- POSTA: </label>
                        <input
                          type="email"
                          name="posta"
                          id="posta"
                          placeholder="E-Postanızı Giriniz"
                          className="form-control"
                          value={posta}
                          onChange={this.changeInput}
                        />
                      </div>

                      <div className="form-row">
                        <label htmlFor="name">DOĞUM TARİHİ: </label>
                        <input
                          type="date"
                          name="dogum_tarihi"
                          min="0000-01-01"
                          max="9999-12-31"
                          id="dogum_tarihi"
                          placeholder="Doğum Tarihinizi Giriniz"
                          className="form-control"
                          value={dogum_tarihi}
                          onChange={this.changeInput}
                        />
                      </div>
                      <div className="form-row">
                        <div className="col">
                          <label htmlFor="name">
                            PERAKENDE TİCARETİ İLE UĞRAŞTINIZ MI?
                          </label>
                          <select
                            className="form-control"
                            id="exampleFormControlSelect1"
                            name="perakendeTicaret"
                            value={perakendeTicaret}
                            onChange={this.changeInput}
                          >
                            <option>Seçiniz</option>
                            <option>Evet</option>
                            <option>Hayır</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-row">
                        <label htmlFor="name">
                          LOKUMCU BABA’YI TERCİH ETMENİZİN SEBEBİ NEDİR?
                        </label>
                        <textarea
                          type="text"
                          name="lokumcuBabaTercihSebebi"
                          id="lokumcuBabaTercihSebebi"
                          className="form-control"
                          value={lokumcuBabaTercihSebebi}
                          onChange={this.changeInput}
                        />
                      </div>
                      <div className="form-row">
                        <div className="col">
                          <label htmlFor="name">
                            HANGİ İL İÇİN LOKUMCU BABA İŞLETMECİLİĞİ
                            DÜŞÜNÜYORSUNUZ?
                          </label>
                          <select
                            type="text"
                            name="lokumcuBabaAcmaYeriniz"
                            id="lokumcuBabaAcmaYeriniz"
                            className="form-control"
                            value={lokumcuBabaAcmaYeriniz}
                            onChange={this.changeInput}
                          >
                            <option value="0">------</option>
                            <option>Adana</option>
                            <option>Adıyaman</option>
                            <option>Afyonkarahisar</option>
                            <option>Ağrı</option>
                            <option>Amasya</option>
                            <option>Ankara</option>
                            <option>Antalya</option>
                            <option>Artvin</option>
                            <option>Aydın</option>
                            <option>Balıkesir</option>
                            <option>Bilecik</option>
                            <option>Bingöl</option>
                            <option>Bitlis</option>
                            <option>Bolu</option>
                            <option>Burdur</option>
                            <option>Bursa</option>
                            <option>Çanakkale</option>
                            <option>Çankırı</option>
                            <option>Çorum</option>
                            <option>Denizli</option>
                            <option>Diyarbakır</option>
                            <option>Edirne</option>
                            <option>Elazığ</option>
                            <option>Erzincan</option>
                            <option>Erzurum</option>
                            <option>Eskişehir</option>
                            <option>Gaziantep</option>
                            <option>Giresun</option>
                            <option>Gümüşhane</option>
                            <option>Hakkâri</option>
                            <option>Hatay</option>
                            <option>Isparta</option>
                            <option>Mersin</option>
                            <option>İstanbul</option>
                            <option>İzmir</option>
                            <option>Kars</option>
                            <option>Kastamonu</option>
                            <option>Kayseri</option>
                            <option>Kırklareli</option>
                            <option>Kırşehir</option>
                            <option>Kocaeli</option>
                            <option>Konya</option>
                            <option>Kütahya</option>
                            <option>Malatya</option>
                            <option>Manisa</option>
                            <option>Kahramanmaraş</option>
                            <option>Mardin</option>
                            <option>Muğla</option>
                            <option>Muş</option>
                            <option>Nevşehir</option>
                            <option>Niğde</option>
                            <option>Ordu</option>
                            <option>Rize</option>
                            <option>Sakarya</option>
                            <option>Samsun</option>
                            <option>Siirt</option>
                            <option>Sinop</option>
                            <option>Sivas</option>
                            <option>Tekirdağ</option>
                            <option>Tokat</option>
                            <option>Trabzon</option>
                            <option>Tunceli</option>
                            <option>Şanlıurfa</option>
                            <option>Uşak</option>
                            <option>Van</option>
                            <option>Yozgat</option>
                            <option>Zonguldak</option>
                            <option>Aksaray</option>
                            <option>Bayburt</option>
                            <option>Karaman</option>
                            <option>Kırıkkale</option>
                            <option>Batman</option>
                            <option>Şırnak</option>
                            <option>Bartın</option>
                            <option>Ardahan</option>
                            <option>Iğdır</option>
                            <option>Yalova</option>
                            <option>Karabük</option>
                            <option>Kilis</option>
                            <option>Osmaniye</option>
                            <option>Düzce</option>
                          </select>
                        </div>

                        <div className="form-row">
                          <label htmlFor="name">
                            YATIRIM MİKTARINIZ NEDİR?{" "}
                          </label>
                          <input
                            type="number"
                            name="yatırım"
                            id="yatırım"
                            placeholder="Miktar Giriniz"
                            className="form-control"
                            value={yatırım}
                            onChange={this.changeInput}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">EKLEMEK İSTEDİKLERİNİZ:</label>
                        <textarea
                          type="text"
                          name="eklemek"
                          id="eklemek"
                          placeholder="Eklemek İstedikleriniz"
                          className="form-control"
                          value={eklemek}
                          onChange={this.changeInput}
                        />
                      </div>
                      <button
                        onClick={this.gonder}
                        className="btn btn-danger btn-block "
                        type="submit"
                      >
                        Formu Gönder
                      </button>
                    </form>
                  </div>
                </Animation>
              </div>
            </div>
          );
        }}
      </UserConsumer>
    );
  }
}
export default AddBasvuru;
