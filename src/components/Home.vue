<template>
  <v-flex xs12 sm11 md11 lg9 xl8>
    <h1 class="mt-3 mb-5 display-1 grey--text text--darken-3 text-xs-center">
      Bienvenido al Registro Único de Artistas y Gestores Culturales
    </h1>
    <!-- Qué es el RUAC -->
    <v-card class="mb-5">
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-card-media :src="items[0].src" height="270">
            <v-layout fill-height align-center justify-center>
              <h2 class="display-2 white--text text-xs-center">{{items[0].title}}</h2>
            </v-layout>
          </v-card-media>
        </v-flex>
        <v-flex xs12 md6>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 class="pa-2 grey--text text--darken-3">
                {{items[0].text}}
              </v-flex>
              <v-flex xs12 pl-0 pt-2>
                <v-btn to="/inicio-sesion" primary>
                  <v-icon dark left>face</v-icon> Inicia sesión
                </v-btn>
                <v-btn to="/registro" primary>
                  <v-icon dark left>fingerprint</v-icon> Regístrate
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-card>
    <!-- Beneficios -->
    <v-card class="mb-5">
      <v-layout row wrap>
        <v-flex xs12 md6 order-xs1 order-md2>
          <v-card-media :src="items[1].src" height="270">
            <v-layout fill-height align-center justify-center>
              <h2 class="display-2 white--text text-xs-center">{{items[1].title}}</h2>
            </v-layout>
          </v-card-media>
        </v-flex>
        <v-flex xs12 md6 order-xs2 order-md1>
          <v-card-text>
            <div class="pa-2 grey--text text--darken-3" v-html="items[1].text"></div>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-card>
    <!-- Base legal -->
    <v-card class="mb-5">
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-card-media :src="items[2].src" height="270">
            <v-layout fill-height align-center justify-center>
              <h2 class="display-2 white--text text-xs-center">{{items[2].title}}</h2>
            </v-layout>
          </v-card-media>
        </v-flex>
        <v-flex xs12 md6>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 class="pa-2 grey--text text--darken-3">
                {{items[2].text}}
              </v-flex>
              <v-flex xs12 pl-0 pt-2>
                <v-btn href="/static/docs/acuerdo_ministerial.pdf" target="_blank" outline class="deep-purple--text">
                  Acuerdo Ministerial
                </v-btn>
                <v-btn href="/static/docs/norma_tecnica.pdf" target="_blank" outline class="deep-purple--text">
                  Norma Técnica
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-card>
    <!-- Preguntas Frecuentes -->
    <h2 class="mb-4 pt-3 headline grey--text text--darken-3">Preguntas Frecuentes</h2>
    <v-card flat class="mb-5">
      <v-expansion-panel>
        <v-expansion-panel-content v-for="(pregunta, i) in preguntas" :key="i">
          <div slot="header" class="ml-2 mr-5 grey--text text--darken-4">{{i+1}}. {{pregunta.title}}</div>
          <v-card>
            <v-card-text class="px-4 grey lighten-3 grey--text text--darken-3">{{pregunta.response}}</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card>
    <!-- Dirección y contactos -->
    <h2 class="mb-4 pt-3 headline grey--text text--darken-3">Dirección y contactos</h2>
    <v-card>
      <v-layout row wrap>
        <v-flex xs12 md5 pa-4 class="pa-2 grey--text text--darken-3" order-xs2 order-md1>
          <p>Dirección: Av. Colón E5-34 y Juan León Mera</p>
          <p>Email: ruac@culturaypatrimonio.gob.ec</p>
          <p>Teléfono: 593-2 381-4550</p>
          <p>Quito – Ecuador</p>
        </v-flex>
        <v-flex xs12 md7 order-xs1 order-md2>
          <gmap-map :center="center" :zoom="19" style="min-width: 320px; height: 350px">
            <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"></gmap-marker>
          </gmap-map>
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    center: { lat: -0.200840, lng: -78.489790 },
    markers: [{
      position: { lat: -0.200840, lng: -78.489790 }
    }],
    items: [
      {
        src: '/static/website/5.jpg',
        title: 'Qué es el RUAC?',
        text: 'Es la plataforma virtual que sirve para el registro de artistas y gestores cuya actividad económica u oficio se desarrolla en el campo de la cultura y las artes del Ecuador.'
      },
      {
        src: '/static/website/4.jpg',
        title: 'Beneficios',
        text: `<div class="mb-1">Permite incluir a los artistas y gestores culturales en el régimen de seguridad social.</div>
               <div class="mb-1">Facilita la aplicación del Régimen Integral de Educación y Formación en Artes, Cultura y Patrimonio.</div>
               <div class="mb-1">Habilita el acceso a los incentivos tributarios contemplados en la Ley Orgánica de Cultura.</div>
               <div>Faculta la participación en las Asambleas Provinciales de la Casa de la Cultura Ecuatoriana Benjamín Carrión.</div>`
      },
      {
        src: '/static/website/3.jpg',
        title: 'Base Legal',
        text: 'La Ley Orgánica de Cultura establece que el Sistema Integral de Información Cultural (SIIC) recopilará, sintetizará, difundirá y pondrá en valor la información del ámbito cultural y patrimonial, generada por las entidades públicas, privadas o comunitarias, la comunidad artística y la ciudadanía en general.'
      }
    ],
    preguntas: [
      {
        title: 'No puedo crear mi usuario, me sale un mensaje de error ¿Qué debo hacer?',
        response: 'Estimado usuario, debe comprobar que los datos ingresados concuerden con su cédula de ciudadanía. Si luego de esto persiste el inconveniente, comuníquese al (02) 3814550 ext. 500/957/266 para brindarle la asistencia necesaria.'
      },
      {
        title: 'He confirrmado la creación de mi usuario pero no puedo acceder a mi cuenta. ¿Qué puedo hacer?',
        response: 'Estimado usuario, si presenta inconvenientes al acceder a su cuenta, vaya a la opción "recuperar contraseña" e ingrese al sistema con la contraseña temporal generada, la que debe cambiar para su seguridad.'
      },
      {
        title: 'Ingresé mal mi dirección electrónica y necesito registrar la correcta. ¿Qué debo hacer?',
        response: 'Estimado usuario, dirija su solicitud a la siguiente dirección de correo electrónico: ruac@culturaypatrimonio.gob.ec. Adjunte copia de su documento de identidad para su respaldo.'
      },
      {
        title: '¿Se debe validar la información de mi actividad cultural y trayectoria para que pueda ser parte del RUAC?',
        response: 'El Ministerio de Cultura y Patrimonio no se encarga de validar o calificar su actividad o trayectoría cultural, sin embargo, a fin de que pueda hacer uso de la plataforma y los beneficios establecidos en la Ley Orgánica de Cultura, esta Cartera de Estado es responsable de verificar la información otorgada por los usuarios para confirmar su identidad.'
      },
      {
        title: 'Yo cuento con títulos de tercer y cuarto nivel que no aparecen en el sistema de la plataforma del RUAC ¿Qué debo hacer para que sean reconocidos?',
        response: 'En caso de que usted cuente con un título registrado en la Senescyt que no aparece de manera automática en la plataforma del RUAC, le solicitamos incluir el mismo en el apartado de correspondiente a capacitaciones.'
      },
      {
        title: 'He creado mi cuenta exitosamente, sin embargo no he recibido el correo electrónico con los datos de mi usuario y clave. ¿Qué debo hacer?',
        response: 'Una vez creada su cuenta, puede ingresar a la plataforma con su usuario (cédula de ciudadanía) y su contraseña (generada por usted) para poder ingresar los datos correspondientes a actividad cultural, datos generales y trayectoria. El sistema no proporciona la clave.'
      },
      {
        title: 'He recibido un correo electrónico indicando que debo subir información de notas de prensa, enlaces de presentación o respaldos físicos que demuestren mi trayectoria. ¿Cómo realizo este proceso?',
        response: 'Dentro de los campos de trayectoria existe la posibilidad de incluir tres enlaces o direcciones URL, donde se podrá proporcionar los enlaces correspondientes a su blog, portafolio digital, redes sociales, página web y otros, que faciliten el proceso de verificación de la información sobre su actividad cultural. En el caso de usted no disponga de estas herramientas sugerimos utilizar los espacios de almacenamiento digital de datos.'
      },
      {
        title: '¿Cuántos días debo esperar para recibir la notificación de que la información enviada fue vericada?',
        response: 'Los técnicos del Ministerio de Cultura y Patrimonio cuentan con un plazo entre cinco y quince días laborales para realizar el proceso de verificación y notificación.'
      },
      {
        title: '¿Hasta qué fecha podré registrame en el RUAC?',
        response: 'El registro en la plataforma del RUAC estará disponible 24 horas día 7 días a la semana. No existe fecha límite para el registro.'
      },
      {
        title: 'He recibido un correo en el que se menciona que mi información ha sido verificada y que puedo hacer uso de la plataforma. ¿Qué significa?',
        response: 'Esto significa que los técnicos del Ministerio de Cultura y Patrimonio han verificado su identidad en contraste con su actividad cultural y trayectoria. Por lo tanto podrá hacer uso de la plataforma y de sus beneficios según la Ley Orgánica de Cultura.'
      },
      {
        title: '¿Puedo registrarme al RUAC si no tengo la mayoría de edad?',
        response: 'Si pueden registrarse los menores de edad, pero alguno beneficios serán exclusivos de las personas mayores de 18 años, como por ejemplo formar parte del padrón electoral de la Casa de la Cultura.'
      },
      {
        title: '¿Puedo registrame al RUAC si no soy ecuatoriano?',
        response: 'Sí, siempre que tenga su cédula de identidad ecuatoriana vigente.'
      },
      {
        title: '¿Se puede remitir vía correo electrónico fotografías, documentos, certificados y otros que respalden mi actividad cultural y trayectoria, para facilitar el proceso de verificación?',
        response: 'No. Los medios de verificación podrán ser registrados únicamente a través de la plataforma para la revisión de los técnicos del Ministerio de Cultura y Patrimonio.'
      },
      {
        title: '¿Puedo registrarme si resido fuera del país?',
        response: 'Estimado usuario, el registro se puede realizar en línea desde cualquier parte del mundo.'
      }
    ]
  })
}
</script>

<style>
.expansion-panel__header {
  height: auto;
  padding: 15px 0 15px 10px;
}
</style>

