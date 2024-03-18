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
            <h2>Términos y Condiciones para el Nuevo Sistema de Pagos TGR-1 del SENASA</h2>
            <p>Este sistema informático es propiedad y está operado por SENASA. En este texto se establecen los términos y condiciones bajo los cuales se pueden utilizar los servicios ofrecidos por SENASA a través del sistema informático. Este sistema informático ofrece a los visitantes facilidad para la importación de productos vegetales. Al acceder o usar el sistema informático, usted aprueba que ha leído, entendido y aceptado estar sujeto a estos Términos.</p>
            <h3>DEFINICIONES</h3>
            <div className="ms-5 mb-2 mt-2">
                •	SENASA: El Servicio Nacional de Sanidad e Inocuidad alimentaria es la institución competente en certificar los procesos Agro-sanitarios y de Inocuidad Fitosanitaria <br />
                •	Recibo TGR-1: El comprobante TGR (Tesorería General de la República) es el recibo oficial mediante el cual los ciudadanos pagan en cualquier banco del país, los trámites que conllevan un cobro dentro de SENASA.<br />
                •	RTN: El Registro Tributario nacional es un documento que permite a Todas las personas naturales o jurídicas, nacionales o extranjeras, domiciliadas en el país como contribuyentes con obligaciones tributarias materializa como: pago de impuestos, tasas y contribuciones.<br />
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
                •	Usuarios Externos: Se denomina Usuarios externos a todos aquellos que usaran la plataforma para crear un TGR-1 para poder solicitar un servicio a SENASA<br />
                •	Contraseña: Clave que se usa para poder acceder al sistema de pagos nuevos TGR-1  tiene la caracteristica que es personal y no puede ser conocida, solo por el dueño de la misma o aquien el la comparta<br />
                •	Importaciones y Exportaciones de Cuarentena Agropecuaria: Es un área de SENASA encargada de  gestionar los servicios relacionados a importaciones y exportaciones  para consumo humano de origen animal y vegetal<br />
                •	Laboratorios: Es el área de SENASA encargada de  realizar las pruebas y analisis  de sustancias , muestras o similares ya sean de origen animal o vegetal a fin de dar un dictamen de su coimposicion o de cualquier enfermedad o plaga que se pueda encontrar<br />
                •	Salud Animal: Es el área de SENASA encargada de emitir certificados, permisos oi cualquier otro tipo de servicio relacionado a establecimientos o productos o actividades relacionadas con  alimento medicamento animal asi como el registro de fincas para la criao reproduccion de animales<br />
                •	Sanidad Vegetal: Es el área de SENASA encargada de velar por  los servicios relacionados a establecimientos y  productos e insumos para la sanida vegetal por ejemplo plaguicidas y fertilizantes<br />
                •	Sub Direccion General de Inocuidad Agroalimentaria: Es un área de SENASA encargada de  gestionar los servicios relacionados a los aspectos de sanidad y seguridad agroalimentaria para consumo humano de origen animal y vegetal. La regulacion de establecimientos comercializadores etc.<br />
            </div>
            <h3>GENERALIDADES</h3>
            <div className="ms-5 mb-2 mt-2">
                1.	Para usar nuestro sistema informático y / o recibir nuestros servicios, debe tener la mayoría de edad legal en su jurisdicción, y poseer la autoridad legal, el derecho y la libertad para participar en estos Términos como un acuerdo vinculante<br />
                2.	Los términos y condiciones que aplican son los vigentes al momento de utilizar el sistema informático.<br />
                3.	El usuario podrá solicitar información o resolver cualquier consulta a través del correo electrónico info@senasa.gob.hn.<br />
                4.	Estos términos y condiciones se regirán por las normas vigentes en la República de Honduras.<br />
                5.	SENASA no garantiza que los servicios del sistema informático estarán disponibles en cualquier momento o ubicación específica, sin interrupción, sin errores, sin defectos o seguros, que cualquier defecto o error será corregido.<br />
            </div>
            <h3>COSTO DEL SERVICIO</h3>
            <div className="ms-5 mb-2 mt-2">
                1.	El uso del sistema informático no representa ningún costo adicional para el usuario, este es un servicio gratuito brindado por SENASA. Ninguna persona ajena a SENASA debe de soliucitar cobro por este servicio, cualquier cobro que una persona ajena a SENASA haga sobre este servicio  es mera responsabilidad  de la persona que acepta pagarlo. <br />
            </div>
            <h3>SEGURIDAD</h3>
            <div className="ms-5 mb-2 mt-2">
                1.	Para SENASA es de suma importancia que todos los Usuarios de nuestro sistema informático o Clientes conozcan la política de privacidad, confidencialidad y seguridad de los datos que suministran a nuestra organización, así como los términos de uso y las condiciones sobre las cuales se manejará la información que nos suministren en razón a las diferentes actividades que realizamos, lo cual garantiza la privacidad de la información personal.<br />
                2.	SENASA se compromete a garantizar la seguridad de los datos personales, por lo que no se compartirán datos personales ingresados en su perfil con terceros.<br />
                3.	De ninguna manera y bajo ninguna circunstancia SENASA solicitará información confidencial, personal, comercial o financiera, a través del correo electrónico o desde el sistema informático, a fin de evitar el denominado phishing que consiste en el envío de correos electrónicos que, aparentando provenir de fuentes fiables (por ejemplo, entidades bancarias), intentan obtener datos confidenciales del usuario, que posteriormente son utilizados para la realización de algún tipo de fraude, pidiendo al usuario pulsar un enlace que lleva a páginas web falsificadas con fines de estafa, por lo cual el Usuario o Cliente deberá informar a SENASA.<br />

            </div>
            <h3>LIMITACIÓN DE RESPONSABILIDAD</h3>
            <div className="ms-5 mb-2 mt-2">
                1.	En la máxima medida permitida por la ley aplicable, en ningún caso SENASA será responsable por daños indirectos, punitivos, incidentales, especiales, consecuentes o ejemplares, incluidos, entre otros, daños por pérdida de beneficios, buena voluntad, uso, datos. u otras pérdidas intangibles, que surjan de o estén relacionadas con el uso o la imposibilidad de utilizar el servicio. <br />
            </div>
            <h3>PROPIEDAD INTELECTUAL</h3>
            <div className="ms-5 mb-2 mt-2">
                1.	SENASA es dueño único y exclusivo, de todos los derechos, título e intereses en y del sistema informático, de todo el contenido (incluyendo, por ejemplo, audio, fotografías, ilustraciones, gráficos, otros medios visuales, videos, copias, textos, software, firmas digitales, títulos, etc.), códigos, datos y materiales del mismo, el aspecto y el ambiente, el diseño y la organización del sistema informático y la compilación de los contenidos, códigos, datos y los materiales en el sistema informático, incluyendo pero no limitado a, cualesquiera derechos de autor, derechos de marca, derechos de patente, derechos de base de datos, derechos morales, derechos sui generis y otras propiedades intelectuales y derechos patrimoniales del mismo. Su uso del sistema informático no le otorga propiedad de ninguno de los contenidos, códigos, datos o materiales a los que pueda acceder en o a través del Sitio Web. Salvo que se indique explícitamente en este documento, no se considerará que nada en estos Términos crea una licencia en o bajo ninguno de dichos Derechos de Propiedad Intelectual, y usted acepta no vender, licenciar, alquilar, modificar, distribuir, copiar, reproducir, transmitir, exhibir públicamente, realizar públicamente, publicar, adaptar, editar o crear trabajos derivados de los mismos. <br />
                2.	Uso Prohibido. Cualquier distribución, publicación o explotación comercial o promocional del sistema informático, o de cualquiera de los contenidos, códigos, datos o materiales en el sistema informático, está estrictamente prohibido. <br />
                3.	Usted se obliga además a no alterar, editar, borrar, quitar, o de otra manera cambiar el significado o la apariencia de, o cambiar el propósito de, cualquiera de los contenidos, códigos, datos o materiales en o disponibles a través del sistema informático, incluyendo, sin limitación, la alteración o retiro de cualquier marca comercial, marca registrada, logo, marca de servicios, firmas o cualquier contenido de propiedad o notificación de derechos de propiedad. Usted reconoce que no adquiere ningún derecho de propiedad al descargar material. Si usted hace otro uso del sistema informático, o de los contenidos, códigos, datos o materiales que ahí se encuentren o que estén disponibles a través del sistema informático, a no ser como se ha estipulado anteriormente, usted puede violar las leyes de derechos de autor y otras la Republica de Honduras, así como las leyes estatales aplicables, y puede ser sujeto a responsabilidad legal por dicho uso no autorizado <br /> En la máxima medida permitida por la ley aplicable, SENASA no asume responsabilidad alguna por (i) errores, errores o inexactitudes de contenido; (ii) lesiones personales o daños a la propiedad, de cualquier naturaleza que sean, como resultado de tu acceso o uso de nuestro servicio; y (iii) cualquier acceso no autorizado o uso de nuestros servidores seguros y / o toda la información personal almacenada en los mismos.
                4.	SENASA se reserva el derecho de modificar estos términos de vez en cuando a nuestra entera discreción. Por lo tanto, debe revisar estas páginas periódicamente. Cuando cambiemos los Términos de una manera material, notificaremos que se han realizado cambios importantes en los mismos. El uso continuado del sistema informático o nuestro servicio después de dicho cambio constituye tu aceptación de los nuevos Términos. <br />
            </div>
            <h3>FUNCIONALIDADES </h3>
            <p>El Nuevo sistema informático de Pagos TGR-1 de  SENASA tiene como objetivo facilitar la generacion de TGR-1 acorde a los servicios que SENASA presta a todos los usuarios</p>
            <div className="ms-5 mb-2 mt-2">

                1.	El registro de usuarios Externos: El sistema ofrece interfaces que permiten a los usuarios externos recibir sus credenciales de acceso, Corresponde al usuario la responsabilidad de administrar sus credenciales. El usuario tendrá visibilidad de las gestiones de TGR-1 que a realizado a su nombre.<br />
                2.	Restablecimiento de contraseña: En el caso de que el usuario externo olviden su contraseña, el sistema ofrece la facilidad de cambiarla, siempre y cuando tenga acceso al correo registrado en el sistema de pagos del SENASA.<br />
                3.	Adjuntar archivos de respaldo: en el registro de usuarios eternos se pide adjuntar documentos que respalden la identidad o credencial del usuario eterno ya sea Identidad, RTN o pasaporte . Únicamente se pueden ingresar imágenes en formato PNG, JPG y documentos PDF.<br />
                4.	Rechazo de  registro de credenciales en usuario externo: Si el SENASA encuentra inconsistencias en registro o requiere una aclaración, devolverá la solicitud con estado “Rechazo”, el usuario deberá Volver a regitrsrase en base las observaciones y mandar nuevamente la solicitud de registro.<br />
                5.	Creacion de Recibos TGR1 sin registro:  la plataforma del sistema nuevo de Pagos del SENASA permite a los usuarios que no se quieren registrar o eventualmente usarán la plataforma solo de forma ocasional, se ha dejado asi fuera dle registro la oportunidad  de poder generar recibos TGR-1 , dejando bajo responsabilidad del usuario externo colocar correctanmente el RTN o identificador con su respectivo nombre o razon asociado a dicho TGR1. <br />
                6.	El sistema nuevo de Pagos TGR-1 del SENASA: está diseñado en ambiente web, para brindar a todos los usuarios la facilidad de realizar la creacion de TGR-1, desde cualquier dispositivo, ya sea este móvil, Tablet, laptop o PC, el único requisito es contar con conexión a Internet. También cuenta con una interfaz amigable para facilitar el llenado del Recibo. <br />
                7.  El usuario tiene que verificar cuidadosamente que la información digitada es correcta antes de enviar el recibo a descarga y posteriormente a pago.<br />
                6.1	Servicios Precargados: Se han cargado previamente el catálogo de servicios precargados registrados según la tasa de servicios de SENASA publicados en el diario oficial gaceta el Lunes 4 de Marzo del 2019 con el Acuerdo C.D. SENASA 005 2019 . <br />

                En la creacion de recibo TGR-1  estan listados todos los servicios de acuerdo al Area de la cual se obtendra el servicio o la Categoria de los Diferentes tipos de Servicios  de los cuales se requiren efectuar un pago al SENASA. <br />
                Las áreas listadas en el catalogo son:<br />
                <div className="ms-5 mb-2 mt-2">
                    •	Importaciones y Exportaciones de Cuarentena Agropecuaria<br />
                    •	Laboratorios<br />
                    •	Salud Animal<br />
                    •	Sanidad Vegetal<br />
                    •	Sub Direccion General de Inocuidad Agroalimentaria<br />
                    •	Sin Area ( Servicios que no estan asociados a una Ara especifica certificaciones , Multas y penas diversas)<br />

                </div>
                Las categorias tambien pueden ser listadas de acuerdo al tipo de servicio que se estan solicitando estas categorias estan  definidas a partir de la actuvidad que se esta realizando para obtener el servicio de SENASA, cuando no lleva Categoria son servicios que se han definido que no obedecen a una actividad en particular y se definen como no clasificados o sin categoria  <br />
                <div className="ms-5 mb-2 mt-2">
                    •	Actualización
                    •	Autorizción
                    •	Capacitación
                    •	Emisión de certificados
                    •	Emisión de etiquetas
                    •	Emision de notificación
                    •	Inspección
                    •	Movilización
                    •	No clasificado
                    •	Permiso
                    •	Permiso y emisión de notificación
                    •	Pruebas de laboratorio
                    •	Registro
                    •	Supervisión
                    •	Superviusion y emision de constancias
                    •	Toma de muestras
                    •	Vacunación
                    •	Vigilancia
                    •	Revisón
                    •	Sin Categoria
                </div>
                6.2	Codigo de sevicio  es ta funcionalidad es de mucha utilidad cuando se sabe el codigo del servicio que se va a utilizar y hace el camino mas corto en la selección de servicio. <br />
                No se listan los servicio ya que su cantidad es muy grande para este documento. <br />
                6.3	Uso de palabras clave en la busqueda de servicios: esta funcionalidad permite al usuario que va a crear un recibo de TGR-1 de colocar en la caja donde se coloca el nombre de los servicios, se puede colocar una palabra clave ( Que define una de las caracteristicas  que lleva el nombre de dicho servicio) de esta forma buscará los servicios que contengan dicha palabra clave y así facilitar su busqueda. <br />
                6.4	Integracion con Plataforma de SEFIN ( Secretaria de Finanzas): El sistema nuevo de pagos de SENASA esta integrado a traves de protocolos informaticos llamados web services con la plataforma de la Secretaria de Finanzas. Esta integracion permite recibir  casi en tiempo real cuando una vez generado el recibo el usuario se avoca a un banco para realizar el pago respectivo. <br />
                Nota: el usuario bajo su responsabilidad pagara el recibo TGR-1 en su banco de preferencia, SENASA no limita el uso a un banco  en particular.<br />
                SENASA Aclara que mientras el servicio no se otorgado cualquier reclamo  sobre el pago o reembolso del mismo es responsabilidad del Banco que recibe el pago o de la secretaria de Finanzas que es el enter captor de los pagos, por tanto el usuario si necesita un reembolso o aclaracion sobre el pago debe  solicitarlo a estas dos entidades. <br />
                7.	Los Recibos TGR-1:  contienen la siguiente informacion, Número de Recibo TGR-1 , Identificador (RTN, Identidad o Pasaporte), Nombre o Razón Social,Detalle Del Sevicio, Monto  el recibo contiene el sello que indica que esta autorizado por la direccioin de finanzas del SENASA e incluye la fecha de creacion el Recibo. El formato de recibo no es modificable bajo ninguna circuntstancia a solicitude usuario, este ya es un formato predefinido u autorizado por la secretaria de finanzas tambien no puede ser alerado por ningun medio fisico o digital <br />
                7.1	La Descarga del Recibo TGR-1: El recibo de TGR-1 es descargado una vez que se le da a l caja de chequeo donde se le pide revisar sus datos y que esta conforme, “Confirmo que he revisado toda la información ingresada y que los detalles del recibo TGR-1 corresponden al servicio que se ha solicitado.” Y se le da al botón generar para descargar el recibo en formato PDF <br />
                7.2	El uso del recibo impreso queda bajo responsabilidad del usuario SENASA no se hace responsable si el recibo no es pagado en el lapso de 15 dias  despues de haberse creado. El recibo es eliminiado y no se podra pagar. Por tanto tendrá que crear un recibo nuevo. <br />
                8.	Notificaciones automáticas: El sistema enviará notificaciones automáticas del estado de la gestión del recibo vía correo electrónico. Las notificaciones se recibirán cuando suceda una de las siguientes gestiones: recibo pagado, procesamiento de recibo <br />
                <h4>
                AL USAR EL SISTEMA INFORMATICO, USTED ACEPTA Y ESTÁ DE ACUERDO CON ESTOS TÉRMINOS Y CONDICIONES EN LO QUE SE REFIERE A SU USO. Si usted no está de acuerdo con estos Términos y Condiciones, no puede tener acceso al mismo ni usar el sistema informático de ninguna otra manera.
                </h4>
            </div>

        </div>

    );
}


export default TerminosCondiciones;