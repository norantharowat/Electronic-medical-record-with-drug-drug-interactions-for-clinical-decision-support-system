<template>
    <ion-page>
        <ion-content class="content">

            <ion-grid  >      

                <ion-row >
                    <ion-col offset-lg="0.2" offset-xs="3.4" size-lg="1.5" size-xs="6">
                        <div class="image">   
                        <img src="../../../public/assets/mainlogo.png" @click="router.push('/')"  >   
                        </div>
                    </ion-col>

                    
                    <ion-col size-lg="3" offset-lg="0.9" size-xs="6" offset-md="0" >
                 
                        <ion-button   class="signup" @click="logout"> Log out</ion-button>
              
                    </ion-col>
                </ion-row>
                  
                <ion-row class="ion-justify-content-center">
    
                 <ion-col  size-lg="6" class="login-box">
                    <div >
                        <h2>Add a new stuff member</h2>
                        <form v-on:submit.prevent="">
                            <ion-grid class="FormGrid">

                            
                                <ion-row class="ion-justify-content-center" >
                                    <ion-col size="12" size-sm size-lg="8" >
                                        <div class="user-box">
                                        <input  type="text"   required="" v-model="email">
                                        
                                        <label  class="Down"> Stuff Email </label>
                                                        
                                        </div>
                                    </ion-col>
                                
                                </ion-row>

                                
                    

                                <ion-row class="ion-justify-content-center">
                                
                                    <ion-col size-lg="3" size-xs="6" >
                                        <form-button  @click="SendCode" type="button" buttonText="Send Code"/>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                        </form>
                    </div>
                </ion-col>

            </ion-row>

                <ion-row class="ion-justify-content-center">
    
                 <ion-col  size-lg="6" class="login-box">
                    <div >
                        <h2>Add a Clinic</h2>
                        <form v-on:submit.prevent="">
                            <ion-grid class="FormGrid">

                            
                                <ion-row class="ion-justify-content-center" >
                                    <ion-col size="12" size-sm size-lg="8" >
                                        <div class="user-box">
                                        <input  type="text"   required="" v-model="clinic.clinic_name">
                                        
                                        <label  class="Down"> Clinic Name </label>
                                                        
                                        </div>
                                    </ion-col>
                                
                                </ion-row>

                                <ion-row class="ion-justify-content-center" >
                                    <ion-col size="12" size-sm size-lg="8" >
                                        <div class="user-box">
                                        <input  type="text"   required="" v-model="clinic.address">
                                        
                                        <label  class="Down"> Clinic Address </label>
                                                        
                                        </div>
                                    </ion-col>
                                
                                </ion-row>

                                
                    

                                <ion-row class="ion-justify-content-center">
                                
                                    <ion-col size-lg="3" size-xs="6" >
                                        <form-button  @click="AddClinic" type="button" buttonText="Add"/>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                        </form>
                    </div>
                </ion-col>

            </ion-row>


                
        
            </ion-grid>
        </ion-content>
    </ion-page>
</template>


<script>
import { defineComponent } from 'vue';
import { IonPage,IonContent,IonCol, IonGrid, IonRow,alertController  } from '@ionic/vue';
import FormButton from '../../components/FormButton'
import {useRouter} from 'vue-router';
export default defineComponent({
  name: ' ProfilePurchase',
  components: {
    
    IonCol,
    IonGrid,
    IonRow,
    IonContent,
    IonPage,
    FormButton,
   
   
    
   
  },
  
  data(){
    return{
      
      email:'',
      emailFormat: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ ,
      clinic: {
        clinic_name: '',
        address: '',
        
        } ,
        myclincs:''     
    }
  },
  methods: {
    async presentAlert(msg) {
      const alert = await alertController
        .create({
          cssClass: 'alert',
          header: 'Alert',
          // subHeader: 'Subtitle',
          message: msg,
          buttons: ['OK'],
        });
      return alert.present();
    },
    logout(){
      localStorage.removeItem('tokenPurchase');
      this.router.push('/');
    },
    async SendCode(){
      if(this.email){
        // const user = this.$store.getters['user']
        await fetch(process.env.VUE_APP_ROOT_API+`myclinics`,{
          method: 'get',
          headers: {'Content-Type': 'application/json', 'authorization': 'Bearer '+localStorage.getItem('tokenPurchase')},
        })
        .then(response => response.json())
        .then(clinics => {
        
          this.myclincs = clinics
          
        } )
        
        if(this.myclincs.length === 0){

          this.presentAlert("Cant Add stuff while having no clinics")
        } else {


          if(!this.email.match(this.emailFormat)){
            this.presentAlert("Please Enter a Valid Email")
          }else{
            // const customer_data = this.$store.getters['user'];
            const data = {email:this.email};
            // const data = {customer_id:customer_data.customer_id , email:this.email};
  
             fetch(process.env.VUE_APP_ROOT_API+'sendcode', {
              method: 'post',
              headers: {'Content-Type': 'application/json', 'authorization': 'Bearer '+localStorage.getItem('tokenPurchase')},
              body: JSON.stringify(data)
              }).then(res => {
                  
              if(!res.ok){
                  throw new Error(res.status)
              }else{
                  // return res.json();
                  this.presentAlert("Code sent successfuly")
                  this.email = '';
                
                  // this.router.push('/LoginPurchase')
                 
              }
              })
              .catch(() =>
              { 
              
              this.presentAlert("Unable to send Code")
  
              })
            
        }

        }
      }else{
        this.presentAlert("Please Enter an Email")
      }
    },

    AddClinic(){
      if(!(this.clinic.clinic_name === '' && this.clinic.address === '' )){
        // const customer_data = this.$store.getters['user'];
          const data = this.clinic;
          // const myHeaders = new Headers('application/json');
          // myHeaders.append('Content-Type',)
           fetch(process.env.VUE_APP_ROOT_API+'addClinic', {
            method: 'post',
            headers: {'Content-Type': 'application/json', 'authorization': 'Bearer '+localStorage.getItem('tokenPurchase')},
            body: JSON.stringify(data)
            }).then(res => {
                
            if(!res.ok){
                throw new Error(res.status)
            }else{
                // return res.json();
                this.presentAlert("Clinic Added successfuly")
                this.clinic.clinic_name = '';
                this.clinic.address = '';
                
                // this.router.push('/LoginPurchase')
               
            }
            })
            .catch(() =>
            { 
            
            this.presentAlert("Unable to Add Clinic")

            })
      }else{
        this.presentAlert("Please Fill all data")
      }
    }
    
  },
 
  setup(){
    const router = useRouter();
    return { router };
  }
 
});
</script>

<style scoped>

.content {
  margin:0;
  padding:0;
  font-family: sans-serif;
  
  --background: linear-gradient(#141e30, #243b55);
  
}
.signup{
  color: #000000;
  --background: #ffffff;
  --border-radius: 300px;
  width: 140px;
  height: 55px;
}

.signup:hover {
--background: transparent ;
border : 2px solid #ffffff;
border-radius: 300px;
color: #ffffff;
transition-duration: 0.4s;

}
img , .button{
  margin-top: 25%;
}
img:hover{
  cursor: pointer;
}
.login-box h2 {
  font-family: 'Monoton';
  margin: 0 0 30px;
  padding: 0;
  color: #ffffff;
  font-size: 45px;
  letter-spacing: 9px;

  text-align: center;
  font-weight: 100;
}


.grid ion-col{
    --ion-grid-column-padding: 5px;
   
}
</style>