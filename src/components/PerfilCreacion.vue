<template>
  <v-flex xs12 sm10 md10 lg8 xl8 class="white">
    <v-stepper v-model="step" vertical>
      <v-stepper-step step="1" editable :complete="step > 1" class="indigo--text">
        <span class="subheading indigo--text">DATOS GENERALES</span>
      </v-stepper-step>
      <v-stepper-content step="1">
        <v-flex xs12>
          <v-text-field label="Número de cédula" v-model="perfil.cedula" disabled></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Nombre completo" v-model="perfil.nombre_completo" disabled></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Fecha de nacimiento" v-model="perfil.fecha_nacimiento" disabled></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Lugar de nacimiento" v-model="perfil.lugar_nacimiento" disabled></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Nacionalidad" v-model="perfil.nacionalidad" disabled></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Nombre artístico"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-select label="País de domicilio" :items="paises"></v-select>
        </v-flex>
        <v-flex xs12>
          <v-select label="Provincia de domicilio" :items="provincias"></v-select>
        </v-flex>
        <v-flex xs12>
          <v-select label="Cantón de domicilio" :items="cantones"></v-select>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Teléfono de contacto"></v-text-field>
        </v-flex>
        <v-btn outline class="indigo--text" @click="step = 2">
          Continuar
          <v-icon class="indigo--text">navigate_next</v-icon>
        </v-btn>
      </v-stepper-content>
  
      <v-stepper-step step="2" editable :complete="step > 2">
        <span class="subheading indigo--text">ACTIVIDAD CULTURAL</span>
      </v-stepper-step>
      <v-stepper-content step="2">
        <v-flex xs12>
          <v-select label="Tipo de actividad" :items="tipo_actividad"></v-select>
        </v-flex>
        <v-flex xs12>
          <v-select label="Ámbito de la actividad principal" :items="ambito_actividad"></v-select>
        </v-flex>
        <v-flex xs12>
          <v-select label="Ámbito de la actividad secundaria" :items="ambito_actividad"></v-select>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Título registrado en la SENESCYT" v-model="perfil.titulo_senescyt" disabled></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-select label="¿Ha postulado en mecanismos de fomento?" :items="mecanismos_fomento" multiple chips></v-select>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Apoyo de otras entidades"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-select label="¿Alguna obra de su autoría está registrada en el IEPI?" :items="si_no"></v-select>
        </v-flex>
        <v-flex xs12>
          <v-select label="¿Pertenece a algún tipo de organización cultural?" :items="si_no"></v-select>
        </v-flex>
        <v-flex xs12>
          <v-select label="¿Tiene usted seguridad social?" :items="si_no"></v-select>
        </v-flex>
        <v-flex xs12>
          <v-select label="Tipo de seguridad social" :items="tipo_seguridad_social"></v-select>
        </v-flex>
        <v-btn outline class="indigo--text" @click="step = 3">
          Continuar
          <v-icon class="indigo--text">navigate_next</v-icon>
        </v-btn>
      </v-stepper-content>
  
      <v-stepper-step step="3" editable :complete="step > 3">
        <span class="subheading indigo--text">TRAYECTORIA</span>
      </v-stepper-step>
      <v-stepper-content step="3">
        <v-flex xs12>
          <v-text-field label="Logros alcanzados" multi-line rows="4"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Participación en proyectos culturales" multi-line rows="4"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Formación y capacitación" multi-line rows="4"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Página web o blog" prepend-icon="web"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="YouTube"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Facebook"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Twitter"></v-text-field>
        </v-flex>
        <v-flex xs12 mb-3>
          <label class="subheading">
            Declaro que son ciertos, reales y verificables todos los datos consignados, haciéndome responsable de cualquier omisión o falsedad en la información solicitada:
            <v-select class="custom-select" :items="declaracion_si_no" single-line v-model="declaracion"></v-select>
          </label>
        </v-flex>
        <v-btn primary>
          <v-icon left dark>save</v-icon>
          Guardar perfil
        </v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    step: 1,
    perfil: {
      cedula: '1718896580',
      nombre_completo: 'GALINDO HIDALGO SANTIAGO PAÚL',
      fecha_nacimiento: '1983-03-06',
      lugar_nacimiento: 'PICHINCHA/QUITO/SAN BLAS',
      nacionalidad: 'ECUATORIANA',
      titulo_senescyt: 'INGENIERO EN SISTEMAS INFORMATICOS Y DE COMPUTACION'
    },
    paises: [
      'ECUADOR', 'COLOMBIA', 'PERU', 'BRASIL', 'ARGENTINA', 'CHILE', 'PANAMA', 'MEXICO', 'CUBA', 'BOLIVIA',
      'PARAGUAY', 'URUGUAY', 'HONDURAS', 'COSTA RICA', 'GUATEMALA', 'EL SALVADOR', 'NICARAGUA', 'EGIPTO',
      'REPUBLICA DOMINICANA', 'CANADA', 'ESTADOS UNIDOS DE AMERICA', 'FRANCIA', 'PAISES BAJOS (HOLANDA)',
      'FEDERACION DE RUSIA', 'ESPAÑA', 'INDONESIA', 'MALASIA', 'PORTUGAL', 'COREA DEL SUR', 'AUSTRIA',
      'ALEMANIA', 'SUECIA', 'BELGICA', 'ITALIA', 'AUSTRALIA', 'CHINA', 'JAPON', 'SUIZA', 'POLONIA',
      'ISRAEL', 'REINO UNIDO', 'HUNGRIA', 'INDIA', 'VENEZUELA', 'OTROS'
    ],
    provincias: [
      'PICHINCHA',
      'GUAYAS'
    ],
    cantones: [
      'QUITO',
      'GUAYAQUIL'
    ],
    tipo_actividad: [
      'Creador',
      'Productor',
      'Gestor cultural',
      'Técnicos',
      'Otro trabajador de la cultura'
    ],
    ambito_actividad: [
      'Artes vivas y escénicas',
      'Artes plásticas y visuales',
      'Artes literarias, narrativas y producción editorial',
      'Artes cinematográficas y audiovisuales',
      'Artes musicales y sonoras',
      'Diseño y artes aplicadas',
      'Producción y gestión cultural',
      'Investigación, promoción y difusión',
      'Memoria social',
      'Patrimonio cultural',
      'Otras'
    ],
    mecanismos_fomento: [
      'Fondos concursables del MCYP',
      'Auspicios del MCYP',
      'Fondo de fomento CNCine',
      'Financiamiento Foncultura'
    ],
    si_no: [
      'Si',
      'No'
    ],
    tipo_seguridad_social: [
      'Voluntario',
      'Dependiente'
    ],
    declaracion: 'No',
    declaracion_si_no: [
      'Sí',
      'No'
    ]
  })
}
</script>

<style>
.stepper--vertical .stepper__content:not(:last-child) {
  border-left: none;
}

.stepper--vertical .stepper__content {
  margin: 0;
  padding: 5px 25px;
}

.custom-select {
  width: 50px;
  display: inline-flex;
  margin: 0 0 0 10px;
  font-weight: 500;
}
</style>
