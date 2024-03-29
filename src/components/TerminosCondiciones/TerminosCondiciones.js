import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import PropTypes, { element } from 'prop-types';
import { CBadge, CCard, CCardBody, CCardTitle, CCardText, CButton, CSpinner } from '@coreui/react'

function TerminosCondiciones(props) {
    const [state, setState] = useState(
        {

        }
    );

    useEffect(() => {

    }, []);

    return (
        <div className="ms-3 me-3">
            <h2>Términos y Condiciones para el Nuevo Sistema de Pagos para servios de GQ Racing</h2>
            <p>Este sistema informático es propiedad y está operado por GQ Racing. En este texto se establecen los términos y condiciones bajo los cuales se pueden utilizar los servicios ofrecidos por GQ Racing a través del sistema informático. Este sistema informático ofrece a los visitantes facilidad para la importación de productos vegetales. Al acceder o usar el sistema informático, usted aprueba que ha leído, entendido y aceptado estar sujeto a estos Términos.</p>
            <h3>DEFINICIONES</h3>
            <div className="ms-5 mb-2 mt-2">
                •	GQ Racing: El Servicio Nacional de Sanidad e Inocuidad alimentaria es la institución competente en certificar los procesos Agro-sanitarios y de Inocuidad Fitosanitaria <br />
               •	DUI: El Registro Tributario nacional es un documento que permite a Todas las personas naturales o jurídicas, nacionales o extranjeras, domiciliadas en el país como contribuyentes con obligaciones tributarias materializa como: pago de impuestos, tasas y contribuciones.<br />
                •	Usuarios: Es la persona natural que utiliza el sistema nuevo de pagos TGR-1 para realizar gestiones de creacion de recibos<br />
                •	Sistema Informatico: Un sistema informático (SI) es un sistema que nos permite almacenar y procesar información mediante una serie de partes interrelacionadas, como el hardware, el software y el personal. De hecho, estos son sus tres componentes fundamentales.<br />
                •	Formato PNG, JPG: PNG es un formato de fotos que se utiliza en gráficos, ilustraciones, y archivos pequeños en la web que necesiten transparencias. JPG: ideal para mostrar fotografías en la web sin ocupar mucho espacio en un servidor<br />
                •	Documentos PDF: El formato PDF (Portable Document Format, Formato de documento portátil) es un formato de archivo universal que conserva las fuentes, las imágenes y la maquetación de los documentos originales creados en una amplia gama de aplicaciones y plataformas<br />
                •	Correo Electrónico El correo electrónico también llamado e-mail, es un mensaje, carta o información que se manda de una computadora a otra. Es uno de los servicios que ofrece Internet.<br />
                •	Phishing: Suplantación de identidad (phishing) El phishing es un método para engañarle y hacer que comparta contraseñas, números de tarjeta de crédito, y otra información confidencial haciéndose pasar por una institución de confianza en un mensaje de correo electrónico<br />
                •	Página web: Página web como ya la definimos anteriormente es un documento digital que se accede mediante un navegador mientras que un sitio web (website) es un conjunto de páginas web relacionadas bajo un mismo tema, que se encuentran bien organizadas y hospedadas en Internet mediante el nombre de dominio.<br />
                •	Software: Conjunto de programas y rutinas que permiten a la computadora realizar determinadas tareas.<br />
                •	Hardware: Es el conjunto de componentes físicos de los que está hecho el equipo y software es el conjunto de programas o aplicaciones, instrucciones y reglas informáticas que hacen posible el funcionamiento del equipo.<br />
                •	Firmas Digitales: Es una forma de sustituir la firma de forma fisica utilizandpo algoritmos matematicos que validan su autenticidad.<br />
                •	Usuarios Externos: Se denomina Usuarios externos a todos aquellos que usaran la plataforma para crear un TGR-1 para poder solicitar un servicio a GQ Racing<br />
                •	Contraseña: Clave que se usa para poder acceder al sistema de pagos nuevos TGR-1  tiene la caracteristica que es personal y no puede ser conocida, solo por el dueño de la misma o aquien el la comparta<br />
                •	Importaciones y Exportaciones de Cuarentena Agropecuaria: Es un área de GQ Racing encargada de  gestionar los servicios relacionados a importaciones y exportaciones  para consumo humano de origen animal y vegetal<br />
                •	Laboratorios: Es el área de GQ Racing encargada de  realizar las pruebas y analisis  de sustancias , muestras o similares ya sean de origen animal o vegetal a fin de dar un dictamen de su coimposicion o de cualquier enfermedad o plaga que se pueda encontrar<br />
                •	Salud Animal: Es el área de GQ Racing encargada de emitir certificados, permisos oi cualquier otro tipo de servicio relacionado a establecimientos o productos o actividades relacionadas con  alimento medicamento animal asi como el registro de fincas para la criao reproduccion de animales<br />
                •	Sanidad Vegetal: Es el área de GQ Racing encargada de velar por  los servicios relacionados a establecimientos y  productos e insumos para la sanida vegetal por ejemplo plaguicidas y fertilizantes<br />
                •	Sub Direccion General de Inocuidad Agroalimentaria: Es un área de GQ Racing encargada de  gestionar los servicios relacionados a los aspectos de sanidad y seguridad agroalimentaria para consumo humano de origen animal y vegetal. La regulacion de establecimientos comercializadores etc.<br />
            </div>
            <h3>GENERALIDADES</h3>
            <div className="ms-5 mb-2 mt-2">
                1.	Para usar nuestro sistema informático y / o recibir nuestros servicios, debe tener la mayoría de edad legal en su jurisdicción, y poseer la autoridad legal, el derecho y la libertad para participar en estos Términos como un acuerdo vinculante<br />
                2.	Los términos y condiciones que aplican son los vigentes al momento de utilizar el sistema informático.<br />
                3.	El usuario podrá solicitar información o resolver cualquier consulta a través del correo electrónico info@senasa.gob.hn.<br />
                4.	Estos términos y condiciones se regirán por las normas vigentes en la República de Honduras.<br />
                5.	GQ Racing no garantiza que los servicios del sistema informático estarán disponibles en cualquier momento o ubicación específica, sin interrupción, sin errores, sin defectos o seguros, que cualquier defecto o error será corregido.<br />
            </div>
            <h3>COSTO DEL SERVICIO</h3>
            <div className="ms-5 mb-2 mt-2">
                1.	El uso del sistema informático no representa ningún costo adicional para el usuario, este es un servicio gratuito brindado por GQ Racing. Ninguna persona ajena a GQ Racing debe de soliucitar cobro por este servicio, cualquier cobro que una persona ajena a GQ Racing haga sobre este servicio  es mera responsabilidad  de la persona que acepta pagarlo. <br />
            </div>
            <h3>SEGURIDAD</h3>
            <div className="ms-5 mb-2 mt-2">
                1.	Para GQ Racing es de suma importancia que todos los Usuarios de nuestro sistema informático o Clientes conozcan la política de privacidad, confidencialidad y seguridad de los datos que suministran a nuestra organización, así como los términos de uso y las condiciones sobre las cuales se manejará la información que nos suministren en razón a las diferentes actividades que realizamos, lo cual garantiza la privacidad de la información personal.<br />
                2.	GQ Racing se compromete a garantizar la seguridad de los datos personales, por lo que no se compartirán datos personales ingresados en su perfil con terceros.<br />
                3.	De ninguna manera y bajo ninguna circunstancia GQ Racing solicitará información confidencial, personal, comercial o financiera, a través del correo electrónico o desde el sistema informático, a fin de evitar el denominado phishing que consiste en el envío de correos electrónicos que, aparentando provenir de fuentes fiables (por ejemplo, entidades bancarias), intentan obtener datos confidenciales del usuario, que posteriormente son utilizados para la realización de algún tipo de fraude, pidiendo al usuario pulsar un enlace que lleva a páginas web falsificadas con fines de estafa, por lo cual el Usuario o Cliente deberá informar a GQ Racing.<br />

            </div>
            <h3>LIMITACIÓN DE RESPONSABILIDAD</h3>
            <div className="ms-5 mb-2 mt-2">
                1.	En la máxima medida permitida por la ley aplicable, en ningún caso GQ Racing será responsable por daños indirectos, punitivos, incidentales, especiales, consecuentes o ejemplares, incluidos, entre otros, daños por pérdida de beneficios, buena voluntad, uso, datos. u otras pérdidas intangibles, que surjan de o estén relacionadas con el uso o la imposibilidad de utilizar el servicio. <br />
            </div>
            <h3>PROPIEDAD INTELECTUAL</h3>
            <div className="ms-5 mb-2 mt-2">
                1.	GQ Racing es dueño único y exclusivo, de todos los derechos, título e intereses en y del sistema informático, de todo el contenido (incluyendo, por ejemplo, audio, fotografías, ilustraciones, gráficos, otros medios visuales, videos, copias, textos, software, firmas digitales, títulos, etc.), códigos, datos y materiales del mismo, el aspecto y el ambiente, el diseño y la organización del sistema informático y la compilación de los contenidos, códigos, datos y los materiales en el sistema informático, incluyendo pero no limitado a, cualesquiera derechos de autor, derechos de marca, derechos de patente, derechos de base de datos, derechos morales, derechos sui generis y otras propiedades intelectuales y derechos patrimoniales del mismo. Su uso del sistema informático no le otorga propiedad de ninguno de los contenidos, códigos, datos o materiales a los que pueda acceder en o a través del Sitio Web. Salvo que se indique explícitamente en este documento, no se considerará que nada en estos Términos crea una licencia en o bajo ninguno de dichos Derechos de Propiedad Intelectual, y usted acepta no vender, licenciar, alquilar, modificar, distribuir, copiar, reproducir, transmitir, exhibir públicamente, realizar públicamente, publicar, adaptar, editar o crear trabajos derivados de los mismos. <br />
                2.	Uso Prohibido. Cualquier distribución, publicación o explotación comercial o promocional del sistema informático, o de cualquiera de los contenidos, códigos, datos o materiales en el sistema informático, está estrictamente prohibido. <br />
                3.	Usted se obliga además a no alterar, editar, borrar, quitar, o de otra manera cambiar el significado o la apariencia de, o cambiar el propósito de, cualquiera de los contenidos, códigos, datos o materiales en o disponibles a través del sistema informático, incluyendo, sin limitación, la alteración o retiro de cualquier marca comercial, marca registrada, logo, marca de servicios, firmas o cualquier contenido de propiedad o notificación de derechos de propiedad. Usted reconoce que no adquiere ningún derecho de propiedad al descargar material. Si usted hace otro uso del sistema informático, o de los contenidos, códigos, datos o materiales que ahí se encuentren o que estén disponibles a través del sistema informático, a no ser como se ha estipulado anteriormente, usted puede violar las leyes de derechos de autor y otras la Republica de Honduras, así como las leyes estatales aplicables, y puede ser sujeto a responsabilidad legal por dicho uso no autorizado <br /> En la máxima medida permitida por la ley aplicable, GQ Racing no asume responsabilidad alguna por (i) errores, errores o inexactitudes de contenido; (ii) lesiones personales o daños a la propiedad, de cualquier naturaleza que sean, como resultado de tu acceso o uso de nuestro servicio; y (iii) cualquier acceso no autorizado o uso de nuestros servidores seguros y / o toda la información personal almacenada en los mismos.
                4.	GQ Racing se reserva el derecho de modificar estos términos de vez en cuando a nuestra entera discreción. Por lo tanto, debe revisar estas páginas periódicamente. Cuando cambiemos los Términos de una manera material, notificaremos que se han realizado cambios importantes en los mismos. El uso continuado del sistema informático o nuestro servicio después de dicho cambio constituye tu aceptación de los nuevos Términos. <br />
            </div>
            <h3>FUNCIONALIDADES </h3>
            <p>El Nuevo sistema informático de Pagos TGR-1 de  GQ Racing tiene como objetivo facilitar la generacion de TGR-1 acorde a los servicios que GQ Racing presta a todos los usuarios</p>
            <div className="ms-5 mb-2 mt-2">

                1.	El registro de usuarios Externos: El sistema ofrece interfaces que permiten a los usuarios externos recibir sus credenciales de acceso, Corresponde al usuario la responsabilidad de administrar sus credenciales. El usuario tendrá visibilidad de las gestiones de TGR-1 que a realizado a su nombre.<br />
                2.	Restablecimiento de contraseña: En el caso de que el usuario externo olviden su contraseña, el sistema ofrece la facilidad de cambiarla, siempre y cuando tenga acceso al correo registrado en el sistema de pagos del GQ Racing.<br />
                3.	Adjuntar archivos de respaldo: en el registro de usuarios eternos se pide adjuntar documentos que respalden la identidad o credencial del usuario eterno ya sea Identidad, RTN o pasaporte . Únicamente se pueden ingresar imágenes en formato PNG, JPG y documentos PDF.<br />
                4.	Rechazo de  registro de credenciales en usuario externo: Si el GQ Racing encuentra inconsistencias en registro o requiere una aclaración, devolverá la solicitud con estado “Rechazo”, el usuario deberá Volver a regitrsrase en base las observaciones y mandar nuevamente la solicitud de registro.<br />
                5.	Creacion de Recibos sin registro:  la plataforma del sistema nuevo de Pagos del GQ Racing permite a los usuarios que no se quieren registrar o eventualmente usarán la plataforma solo de forma ocasional, se ha dejado asi fuera dle registro la oportunidad  de poder generar recibos TGR-1 , dejando bajo responsabilidad del usuario externo colocar correctanmente el RTN o identificador con su respectivo nombre o razon asociado a dicho TGR1. <br />
                6.	El sistema nuevo de Pagos TGR-1 del GQ Racing: está diseñado en ambiente web, para brindar a todos los usuarios la facilidad de realizar la creacion de TGR-1, desde cualquier dispositivo, ya sea este móvil, Tablet, laptop o PC, el único requisito es contar con conexión a Internet. También cuenta con una interfaz amigable para facilitar el llenado del Recibo. <br />
                7.  El usuario tiene que verificar cuidadosamente que la información digitada es correcta antes de enviar el recibo a descarga y posteriormente a pago.<br />
                6.1	Servicios Precargados: Se han cargado previamente el catálogo de servicios precargados registrados según la tasa de servicios de GQ Racing publicados en el diario oficial gaceta el Lunes 4 de Marzo del 2019 con el Acuerdo C.D. GQ Racing 005 2019 . <br />

                En la creacion de recibo TGR-1  estan listados todos los servicios de acuerdo al Area de la cual se obtendra el servicio o la Categoria de los Diferentes tipos de Servicios  de los cuales se requiren efectuar un pago al GQ Racing. <br />
                Las áreas listadas en el catalogo son:<br />
                <div className="ms-5 mb-2 mt-2">
                    •	<br />
                    •	<br />
                    •	 <br />
                    •	 <br />
                    •	<br />
                    •	<br />

                </div>
                Las categorias tambien pueden ser listadas de acuerdo al tipo de servicio que se estan solicitando estas categorias estan  definidas a partir de la actuvidad que se esta realizando para obtener el servicio de GQ Racing, cuando no lleva Categoria son servicios que se han definido que no obedecen a una actividad en particular y se definen como no clasificados o sin categoria  <br />
                <div className="ms-5 mb-2 mt-2">
                   
                </div>
                <h4>
                AL USAR EL SISTEMA INFORMATICO, USTED ACEPTA Y ESTÁ DE ACUERDO CON ESTOS TÉRMINOS Y CONDICIONES EN LO QUE SE REFIERE A SU USO. Si usted no está de acuerdo con estos Términos y Condiciones, no puede tener acceso al mismo ni usar el sistema informático de ninguna otra manera.
                </h4>
            </div>

        </div>

    );
}


export default TerminosCondiciones;