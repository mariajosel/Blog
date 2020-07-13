var tipuesearch = {"pages":[{"title":"Visualizacion de datos","text":"Visualizacion de datos Las visualizaciones fueron realizadas con el dataset del titanic, principalmente utilizo seaborn aun asi por temas de aprendizaje en algunos graficos ocupo matplotlib. La representacion grafica de las variables variara segun lo que se quiera observar: Comparacion: el objetivo es comparar atributos, puede ser un grafico de barras o puntos. Relaciones: Comprender la relacion entre dos o mas atributos. Para determinar si existe un patron entre dos variables numericas. Composicion : Comprender como se compone una variable, diagrama de torta o e barras Distribucion: Esta categoria permite observar como se distribuyen los datos. Suele utilizarse en la exploracion de los datos, el tipo de grafico dependera a que tipo de variable corresponda el atributo, ya sea cuantitativo o cualitativo. Los atributos categoricos pueden ser representados por un grafico de sectores o Torta, los cuales son para observar la composicion del atributo, lo ideal es que sean pocas categoricas para que sea mas claro. Tambien se debe considerar el tipo de variable al escoger el grafico In [1]: import numpy as np import pandas as pd import seaborn as sns import matplotlib.pyplot as plt In [2]: data = pd . read_csv ( \"train.csv\" ) When creating visualizations, the first step is to be clear on the question to be answered. In other words, how is visualization going to help? Mastering python data visualization, Kirthi Raman pie chart is best used to compare the parts of a whole. However, bar graphs can compare things between different groups to show patterns Bar graphs are especially effective when you have numerical data that splits nicely into different categories, so you can quickly see trends within your data. Bar graphs are useful when comparing data across categories. Mastering python data visualization, Kirthi Raman In [3]: data . head () Out[3]: PassengerId Survived Pclass Name Sex Age SibSp Parch Ticket Fare Cabin Embarked 0 1 0 3 Braund, Mr. Owen Harris male 22.0 1 0 A/5 21171 7.2500 NaN S 1 2 1 1 Cumings, Mrs. John Bradley (Florence Briggs Th... female 38.0 1 0 PC 17599 71.2833 C85 C 2 3 1 3 Heikkinen, Miss. Laina female 26.0 0 0 STON/O2. 3101282 7.9250 NaN S 3 4 1 1 Futrelle, Mrs. Jacques Heath (Lily May Peel) female 35.0 1 0 113803 53.1000 C123 S 4 5 0 3 Allen, Mr. William Henry male 35.0 0 0 373450 8.0500 NaN S In [4]: cabecera = [ \"ID\" , \"Sobreviviente\" , \"Clase\" , \"Nombre\" , \"Sexo\" , \"edad\" , \"Hermanos\" , \"Hijos\" , \"Ticket\" , \"Tarifa\" , \"Cabina\" , \"Embarque\" ] data . columns = cabecera data . head ( 5 ) Out[4]: ID Sobreviviente Clase Nombre Sexo edad Hermanos Hijos Ticket Tarifa Cabina Embarque 0 1 0 3 Braund, Mr. Owen Harris male 22.0 1 0 A/5 21171 7.2500 NaN S 1 2 1 1 Cumings, Mrs. John Bradley (Florence Briggs Th... female 38.0 1 0 PC 17599 71.2833 C85 C 2 3 1 3 Heikkinen, Miss. Laina female 26.0 0 0 STON/O2. 3101282 7.9250 NaN S 3 4 1 1 Futrelle, Mrs. Jacques Heath (Lily May Peel) female 35.0 1 0 113803 53.1000 C123 S 4 5 0 3 Allen, Mr. William Henry male 35.0 0 0 373450 8.0500 NaN S In [5]: data . drop ( labels = [ \"Cabina\" , \"Ticket\" ], axis = 1 , inplace = True ) Scatter works well when having a lot of data values In [6]: #pregunta cuantos Sobrevivientes hubieron por clase? aux = data . groupby ( \"Clase\" ) . agg ( Sobrevivientes = ( \"Sobreviviente\" , \"sum\" )) fig , ax = plt . subplots ( figsize = ( 10 , 10 )) plt . bar ( aux . index , aux [ \"Sobrevivientes\" ], align = 'center' , color = sns . color_palette ( \"coolwarm\" )) for i , val in enumerate ( aux . values ): plt . text ( i + 1 , val , float ( val ), verticalalignment = 'bottom' ) #plt.text(x_pos, y_pos, \"text on plot\") plt . title ( \"Pasajeros Sobrevivientes segun Clases\" , fontdict = { \"fontname\" : \"Fantasy\" , \"fontsize\" : 17 }) plt . ylabel ( \"Cantidad de Sobrevivientes\" , fontdict = { \"fontsize\" : 12 }) plt . xticks ([ 1 , 2 , 3 ]) ax . set_xticklabels ([ \"Clase 1\" , \"Clase 2\" , \"Clase 3\" ]) plt . show () findfont: Font family ['Fantasy'] not found. Falling back to DejaVu Sans. In [7]: data = pd . get_dummies ( data , columns = [ \"Sexo\" ]) data . drop ( labels = [ \"Sexo_male\" ], axis = 1 , inplace = True ) fix , ax = plt . subplots () ax = sns . countplot ( \"Sexo_female\" , hue = \"Sobreviviente\" , data = data ,) for p in ax . patches : ax . annotate ( f ' { p . get_height () } ' , ( p . get_x () + 0.2 , p . get_height ()), ha = 'center' , va = 'top' , size = 12 ) plt . show () Titulos Para ingresar titulos en los graficos se utiliza plt.title(\"Titulo\") plt.title(\"Grafico\",fontdict={\"fontname\":\"Comic Sans MS\", \"fontsize\":17}) Plot Types Scatter plot scatter plot muestra la relacion entre las variables numericas. por ejemplo: la relacion entre tener cancer y las diferentes edades de hombres vs mujeres Se puede agregar una linea que muestre la correlacion entre los datos. In [8]: #Edad , Tarifa y sobreviviente g = sns . FacetGrid ( data , col = 'Sobreviviente' , palette = \"set1\" , height = 10 ) g . map ( sns . scatterplot , \"edad\" , \"Tarifa\" , s = 140 , linewidth =. 7 , edgecolor = \"#ffad40\" , color = \"#ff8000\" ) g . add_legend () plt . show () Sizes Los scatter plot se pueden personalizar con el parametro sizes que a medida que un atributo aumenta tambien aumenta el tamaño del punto observado. In [9]: fig , ax = plt . subplots ( figsize = ( 10 , 10 )) sns . scatterplot ( \"edad\" , \"Tarifa\" , hue = \"Sobreviviente\" , data = data , linewidth =. 7 , size = \"Tarifa\" ) plt . title ( \"Distribuciòn de sobreviviente segun tarifa y edad\" , fontdict = { \"fontsize\" : 14 }) plt . show () Histograma Un histograma representa la distribucion de atributos numericos. usualmente los rangos de valores son hechos por bins de igual tamaño, el alto de la barra corresponde a la frecuencia de los valores en ese rango. Lo principal de un histograma es que se puede observar que tendencia tienen los datos, si es simetrica o asimitrica a la derecha o a la izquierda. In [10]: plt . hist ( data [ \"edad\" ]) /home/mariajose/anaconda3/lib/python3.7/site-packages/numpy/lib/histograms.py:839: RuntimeWarning: invalid value encountered in greater_equal keep = (tmp_a >= first_edge) /home/mariajose/anaconda3/lib/python3.7/site-packages/numpy/lib/histograms.py:840: RuntimeWarning: invalid value encountered in less_equal keep &= (tmp_a <= last_edge) Out[10]: (array([ 54., 46., 177., 169., 118., 70., 45., 24., 9., 2.]), array([ 0.42 , 8.378, 16.336, 24.294, 32.252, 40.21 , 48.168, 56.126, 64.084, 72.042, 80. ]), <a list of 10 Patch objects>) In [11]: fig , ax = plt . subplots ( figsize = ( 10 , 10 )) sns . distplot ( data [ \"edad\" ]) plt . title ( \"Histograma Edad\" , fontdict = { \"fontsize\" : 20 }) Out[11]: Text(0.5, 1.0, 'Histograma Edad') In [12]: data [ \"edad\" ] . fillna ( np . median ( data [ \"edad\" ]), inplace = True ) In [13]: plt . hist ( data [ \"edad\" ]) plt . show () Grafica Nube de puntos Este tipo de grafico dibuja un punto por cada observacion. In [14]: plt . figure ( figsize = ( 10 , 10 )) plt . plot ( data [ \"edad\" ], 'o' , markersize = 5 ) plt . show () Box plot Los diagramas de caja permiten apreciar como se distribuyen los valores de una variable, si es que se encuentran mas o menos concentrados o dispersos de acuerdo a los cuartiles y si existen outliers Box plots are most useful in showing the distribution of a set of data. Some notable examples are as follows: Identifying outliers in the data Determining how the data is skewed towards either end In addition to this, consider the following: Hide the points within the box: focus on the outliers Compare across distributions: Box plots Mastering python data visualization, Kirthi Raman Los cuartiles corresponden a los valores que tiene una variable y que cumplen con la funcion de dividir los datos ordenados en cuatro partes con igual valor porcentual, como recordatorio personal lo primero que se debe hacer para calcular los cuartiles es ordenar de menor a mayor los datos, mediante la formula k*N donde k_ 1,2,3 --- N : Numero de elementos del conjunto 4 In [15]: fig , ax = plt . subplots ( figsize = ( 8 , 8 )) sns . color_palette ( \"pastel\" ) sns . boxplot ( y = data [ \"Tarifa\" ]) plt . ylim ( - 10 , 70 ) plt . show () #El boxplot generado nos indica que el valor minimo es 0 , la mediana es aprox 15 #extremo superior aprox es 65 luego de este valor son considerados como outliers Boxplot bivariado. como parametro puede recibir hue y order. donde hue nos agrega otra capa de distribucion y el order nos permite determinar el orden de aparicion de los boxplot In [16]: fig , ax = plt . subplots ( figsize = ( 8 , 8 )) sns . set_context ( 'notebook' ) sns . color_palette ( \"pastel\" ) sns . boxplot ( x = data [ \"Clase\" ], y = data [ \"Tarifa\" ], order = [ 3 , 2 , 1 ]) plt . show () Pie Chart o Grafico de Torta Un pie chart tiene como principal funcion mostrar las proporciones de las categorias como parte de un todo Del mismo libro Mastering python data visualization, Kirthi Raman Limit pie wedges to eight : If there are more than eight proportions to represent, consider a bar graph. Due to limited real - estate, it is difficult to meaningfully represent and interpret the pieces. In [18]: fig , ax = plt . subplots () data [ \"Sexo_female\" ] . value_counts () . plot . pie ( autopct = ' %1.1f%% ' , shadow = False ) plt . show () Pair grid y Pair plot --Seaborn pairgrid genera visualizacion de pares, primero indico que atributos se utilizaran y luego que tipo de grafico quiero ver. g = sns . PairGrid ( data , vars = [ \"edad\" , \"Tarifa\" ]) g = g . map ( plt . scatter ) Se generan dos conjuntos de graficos en donde se alternan los atributos en los ejes. Personalizar las diagonales g = g . map_diag ( plt . hist ) g = g . mapoffdiag ( plt . scatter ) Pairplot genera todos los graficos de correlacion para los diferentes atributos, se puede generar solo en base a determinados atributos In [19]: sns . pairplot ( data , kind = \"scatter\" , hue = \"Sobreviviente\" , palette = 'RdBu' ) plt . show () /home/mariajose/anaconda3/lib/python3.7/site-packages/seaborn/distributions.py:369: UserWarning: Default bandwidth for data is 0; skipping density estimation. warnings.warn(msg, UserWarning) In [20]: g = sns . PairGrid ( data , vars = [ \"edad\" , \"Tarifa\" ], hue = \"Sobreviviente\" ) g = g . map_diag ( plt . hist ) g = g . map_offdiag ( plt . scatter ) plt . legend () plt . show () Otros Point plot Similar a un barplot salvo que solo representa la medida de tendencia central. In [21]: sns . pointplot ( y = data [ \"edad\" ], x = data [ \"Clase\" ], hue = data [ \"Sobreviviente\" ]) Out[21]: <matplotlib.axes._subplots.AxesSubplot at 0x7fdf9ed29e90> Stripplot Strip plot es un scatter plot pero de variables categoricas , tambien puede ser univariado pero debe ser un atributo numerico.</br> Parametro dodge , divide las categorias segun un hue </br> Set context Se puede cambiar el contexto en donde se escala la imagen para adaptarla a nuestra necesidad (paper,talk,notebook,poster) font_scale = 1 , rc = { \"grid.linewidth\" : 5 } In [22]: fig , ax = plt . subplots ( figsize = ( 10 , 10 )) sns . set_context ( \"talk\" ) sns . stripplot ( y = \"edad\" , x = \"Clase\" , data = data , hue = \"Sobreviviente\" ,) plt . show () In [25]: sns . set_context ( \"notebook\" ) sns . stripplot ( y = \"edad\" , x = \"Clase\" , data = data , hue = \"Sobreviviente\" , dodge = True ) plt . show () In [23]: sns . stripplot ( y = data [ \"edad\" ]) Out[23]: <matplotlib.axes._subplots.AxesSubplot at 0x7fdf9ec9ea50> Lm plots Este tipo de graficos es utilizado en regresion y como su nombre nos deja entrever es para graficar modelos lineales. In [24]: sns . lmplot ( x = \"Clase\" , y = \"Tarifa\" , data = data ) Out[24]: <seaborn.axisgrid.FacetGrid at 0x7fdf9edb2490>","tags":"posts","url":"https://c3rssei.github.io/Blog/visualizacion-de-datos.html","loc":"https://c3rssei.github.io/Blog/visualizacion-de-datos.html"},{"title":"Arboles de Decisiones","text":"Descripcion Data Exploration: Es sobre descubrir que es lo que nuestros datos significan estadisticamente y aplicar tecnicas de visualizacion, este paso ser realiza para obtener aspectos importantes del conjunto. Univariado: Se enfoca en el analisis de los atributos uno a uno. Bivariado: Analisa dos atributos en conjunto Si quieres ir directamente a la teoria del arbol de decisiones Go to Aqui! In [1]: #Importacion de librerias import pandas as pd import seaborn as sns import numpy as np import matplotlib.pyplot as plt In [2]: #Cargar los datos data = pd . read_csv ( \"golf-dataset.csv\" ) In [3]: data Out[3]: Outlook Temp Humidity Windy Play Golf 0 Overcast Cool Normal True Yes 1 Overcast Hot High False Yes 2 Overcast Hot Normal False Yes 3 Overcast Mild High True Yes 4 Rainy Cool Normal False Yes 5 Rainy Cool Normal True No 6 Rainy Mild High False Yes 7 Rainy Mild High True No 8 Rainy Mild Normal False Yes 9 Sunny Cool Normal False Yes 10 Sunny Hot High False No 11 Sunny Hot High True No 12 Sunny Mild High False No 13 Sunny Mild Normal True Yes In [4]: #Exploracion de variables para determinar que son, numericas o categoricas data . dtypes Out[4]: Outlook object Temp object Humidity object Windy bool Play Golf object dtype: object In [5]: #Exploracion de variables para determinar si nos enfretamos con registros nulos data . info () <class 'pandas.core.frame.DataFrame'> RangeIndex: 14 entries, 0 to 13 Data columns (total 5 columns): # Column Non-Null Count Dtype --- ------ -------------- ----- 0 Outlook 14 non-null object 1 Temp 14 non-null object 2 Humidity 14 non-null object 3 Windy 14 non-null bool 4 Play Golf 14 non-null object dtypes: bool(1), object(4) memory usage: 590.0+ bytes In [6]: #**Exploracion de variables para determinar si nos enfretamos Problemas atipicos y grandes desviaciones** data . describe ( include = \"all\" ) Out[6]: Outlook Temp Humidity Windy Play Golf count 14 14 14 14 14 unique 3 3 2 2 2 top Sunny Mild Normal False Yes freq 5 6 7 8 9 Analisis Univariado Parte del analisis univariado incluye realizar tablas de frecuencia para observar que tan recurrentes son las categorias. Como son atributos categoricos lo unico que podemos hacer es generar graficos pie o bar y tablas de frecuencia. Para realizar la tabla, creo un nuevo dataframe llamado outlook, mediante el metodo group by que agrupa los datos creando un nuevo indice en este caso sera el atributo outlook, mediante agg creamos una nueva columna que almacena el conteo de los atributos. In [7]: outlook = data . groupby ( \"Outlook\" ) . agg ( Frecuencia = ( \"Outlook\" , \"count\" )) outlook [ \"Frecuencia Acumulada\" ] = outlook [ \"Frecuencia\" ] . cumsum () outlook [ \"Frecuencia Relativa\" ] = outlook [ \"Frecuencia\" ] / 14 outlook Out[7]: Frecuencia Frecuencia Acumulada Frecuencia Relativa Outlook Overcast 4 4 0.285714 Rainy 5 9 0.357143 Sunny 5 14 0.357143 In [41]: plt . subplots ( figsize = ( 15 , 15 )) sns . set_palette ( \"hls\" , 8 ) plt . subplot ( 2 , 2 , 1 ) ax = data [ \"Outlook\" ] . value_counts () . plot . pie ( legend = True , autopct = \" %1.1f%% \" ) ax . set ( title = \"Outlook\" , ylabel = \"\" ) plt . subplot ( 2 , 2 , 2 ) sns . countplot ( x = data [ \"Outlook\" ]) Out[41]: <matplotlib.axes._subplots.AxesSubplot at 0x7f38bd8c5b38> In [48]: temp = data . groupby ( \"Temp\" ) . agg ( Frecuencia = ( \"Temp\" , \"count\" )) temp [ \"Frecuencia Absoluta\" ] = temp [ \"Frecuencia\" ] . cumsum () temp [ \"Frecuencia Relativa % \" ] = round (( temp [ \"Frecuencia\" ] / 14 ) * 100 , 2 ) temp Out[48]: Frecuencia Frecuencia Absoluta Frecuencia Relativa % Temp Cool 4 4 28.57 Hot 4 8 28.57 Mild 6 14 42.86 In [51]: plt . subplots ( figsize = ( 10 , 10 )) plt . subplot ( 2 , 2 , 1 ) #Fila,columna, indice data [ \"Temp\" ] . value_counts () . plot . pie ( legend = True , autopct = \" %1.1f%% \" ) plt . subplot ( 2 , 2 , 2 ) sns . countplot ( data [ \"Temp\" ]) Out[51]: <matplotlib.axes._subplots.AxesSubplot at 0x7f38bd547d30> In [54]: humidity = data . groupby ( \"Humidity\" ) . agg ( Frecuencia = ( \"Humidity\" , \"count\" )) humidity [ \"Frecuencia Absotula\" ] = humidity [ \"Frecuencia\" ] . cumsum () humidity [ \"Frecuencia Relativa\" ] = round (( humidity [ \"Frecuencia\" ] / 14 ) * 100 , 2 ) humidity Out[54]: Frecuencia Frecuencia Absotula Frecuencia Relativa Humidity High 7 7 50.0 Normal 7 14 50.0 In [57]: plt . subplots ( figsize = ( 10 , 10 )) plt . subplot ( 2 , 2 , 1 ) #Fila,columna, indice data [ \"Humidity\" ] . value_counts () . plot . pie ( legend = True , autopct = \" %1.1f%% \" ) plt . subplot ( 2 , 2 , 2 ) sns . countplot ( data [ \"Humidity\" ]) Out[57]: <matplotlib.axes._subplots.AxesSubplot at 0x7f38bd51bac8> In [60]: windy = data . groupby ( \"Windy\" ) . agg ( Frecuencia = ( \"Windy\" , \"count\" )) windy [ \"Frecuencia Absoluta\" ] = windy [ \"Frecuencia\" ] . cumsum () windy [ \"Frecuencia Relativa\" ] = round (( windy [ \"Frecuencia\" ] / 14 ) * 100 , 2 ) windy Out[60]: Frecuencia Frecuencia Absoluta Frecuencia Relativa Windy False 8 8 57.14 True 6 14 42.86 In [63]: plt . figure ( figsize = ( 10 , 10 )) plt . subplot ( 2 , 2 , 1 ) windy [ \"Frecuencia\" ] . plot . pie ( legend = True , autopct = \" %1.1f%% \" ) plt . subplot ( 2 , 2 , 2 ) sns . barplot ( windy . index , windy [ \"Frecuencia\" ]) Out[63]: <matplotlib.axes._subplots.AxesSubplot at 0x7f38bcf573c8> Analisis Bivariado Consiste en el analisis simultaneo de dos variables, explora el concepto de relacion entre las variables (predictor vs target) , Existen tres tipos de analisis Bivariado Numerico & Numerico Categorico & Categorico Numerico & Categorico En el caso de mi dataset es categorico vs categorico , lo que esta compuesto por graficos de barras y el test de chi cuadrado. Para este tipo de analisis chi cuadrado se generan dos hipotesis: hipotesis nula : jugar o no jugar *No* depende del outlook/ wind / humidity/ temp hipotesis alternativa : jugar o no jugar depende del outlook/ wind / humidity/ temp In [66]: pd . crosstab ( data [ \"Outlook\" ], data [ \"Play Golf\" ], margins = True ) Out[66]: Play Golf No Yes All Outlook Overcast 0 4 4 Rainy 2 3 5 Sunny 3 2 5 All 5 9 14 In [69]: plt . figure ( figsize = ( 5 , 5 )) g = sns . countplot ( x = \"Temp\" , data = data , hue = \"Play Golf\" ) In [72]: g = sns . countplot ( x = \"Outlook\" , data = data , hue = \"Play Golf\" ) In [75]: g = sns . countplot ( x = \"Humidity\" , data = data , hue = \"Play Golf\" ) In [78]: g = sns . countplot ( x = \"Windy\" , data = data , hue = \"Play Golf\" ) Test de chi2 para determinar la asociacion entre los atributos(Categoria) Manualmente chicuadrado se calcula con tres pasos: Definir las hipotesis --> listo Construir Tabla de Contingencia Calcular valor de chi cuadrado Tabla de Contingencia La tabla de contingencia se construye con la siguiente formula $E = n * P$ n: Cantidad de elementos en el subconjunto P: Probabilidad la tabla de contingencia se construye en base a la tabla de observados de la siguiente manera: In [81]: observado = pd . crosstab ( data [ \"Outlook\" ], data [ \"Play Golf\" ], margins = True ) print ( observado ) #e1 = 14*((observado[\"All\"][\"Overcast\"]/14 )*(observado[\"Yes\"][\"All\"]/14)) Play Golf No Yes All Outlook Overcast 0 4 4 Rainy 2 3 5 Sunny 3 2 5 All 5 9 14 La tabla de contigencia se construye de la siguiente manera: Tabla de contigencia Play Golf No Yes Overcast E1 = 14 x p(overcast|no) = 14 * p(overcast)* p(no) = 14 * (4/14)* (5/14) = 1.42 E2 = 14 x p(overcast|yes) = 14 * p(overcast)* p(yes) = 14 * (4/14)* (9/14) = 2.57 Rainy E3 = 14 x p(rainy|no) = 14 * p(rainy)* p(no) = 14 * (5/14)* (5/14) = 1.78 E4 = 14 x p(rainy|yes) = 14 * p(rainy)* p(yes) = 14 * (5/14)* (9/14) = 3.12 Sunny E5 = 14 x p(sunny|no) = 14 * p(sunny)* p(no) = 14 * (5/14)* (5/14) = 1.78 E6 = 14 x p(sunny|yes) = 14 * p(sunny)* p(no) = 14 * (5/14)* (9/14) = 3.12 Calcular Chi cuadrado $\\sum{(E-O)**2/E}$ overcast|no = (0- E1)** 2/E1 = (0-1.42)** 2/1.42 = 2.86 overcast|yes = (4 - 2.57)**2/2.57= 5.25 rainy|no =(2-1.78)**2/1.78 = 0.086 rainy|yes=(3-3.12)**2/3.12 = 0.044 sunny|no=(3-1.78)**2/1.78=2.64 sunny|yes=(2-3.12)**2/3.12=3.91 $\\sum{(E-O)**2/E}$ = 14.79 Teniendo en consideracion un alpha de 0.05 ; $df = (nºfilas-1)(nºcolumnas-1)$ df=3-1 * 2-1 = 2 busco el valor en la tabla de chi cuadrado Link Tabla chi=5.99 como el corte de la region es en el punto 5.99 el valor 14.79 cae fuera de la region de aceptacion de h0 entonces aceptamos la hiptesis alternativa que indica que existe relacion entre el target y outlook. Scipy proporciona un metodo que realiza esto y es de la siguiente manera In [84]: from scipy.stats import chi2_contingency observado = pd . crosstab ( data [ \"Outlook\" ], data [ \"Play Golf\" ]) chi , pvalue , df , expected = chi2_contingency ( observado ) print ( \"Outlook vs Play Golf \\n \" ) print ( \"valor de chi cuadrado :\" , chi ) print ( \"valor p o punto de corte:\" , pvalue ) print ( \"grados de libertad:\" , df ) print ( \"\" ) print ( \"Tabla de contingencia \\n \" , expected ) Outlook vs Play Golf valor de chi cuadrado : 3.5466666666666664 valor p o punto de corte: 0.16976615743981122 grados de libertad: 2 Tabla de contingencia [[1.42857143 2.57142857] [1.78571429 3.21428571] [1.78571429 3.21428571]] In [87]: observado = pd . crosstab ( data [ \"Temp\" ], data [ \"Play Golf\" ]) chi , pvalue , df , expected = chi2_contingency ( observado ) print ( \"Temp vs Play Golf \\n \" ) print ( \"valor de chi cuadrado :\" , chi ) print ( \"valor p o punto de corte:\" , pvalue ) print ( \"grados de libertad:\" , df ) print ( \"\" ) print ( \"Tabla de contingencia \\n \" , expected ) Temp vs Play Golf valor de chi cuadrado : 0.5703703703703703 valor p o punto de corte: 0.7518750053142591 grados de libertad: 2 Tabla de contingencia [[1.42857143 2.57142857] [1.42857143 2.57142857] [2.14285714 3.85714286]] In [90]: observado = pd . crosstab ( data [ \"Humidity\" ], data [ \"Play Golf\" ]) chi , pvalue , df , expected = chi2_contingency ( observado ) print ( \"Humidity vs Play Golf \\n \" ) print ( \"valor de chi cuadrado :\" , chi ) print ( \"valor p o punto de corte:\" , pvalue ) Humidity vs Play Golf valor de chi cuadrado : 1.2444444444444445 valor p o punto de corte: 0.2646162170835855 In [93]: observado = pd . crosstab ( data [ \"Windy\" ], data [ \"Play Golf\" ]) chi , pvalue , df , expected = chi2_contingency ( observado ) print ( \"Windy vs Play Golf \\n \" ) print ( \"valor de chi cuadrado :\" , chi ) print ( \"valor p o punto de corte:\" , pvalue ) Windy vs Play Golf valor de chi cuadrado : 0.16203703703703703 valor p o punto de corte: 0.687287949348002 Resumen Outlook vs Play Golf Se acepta la Hipotesis Alternativa Temp vs Play Golf Se acepta la Hipotesis nula Humidity vs Play Golf Se acepta la Hipotesis alternativa Windy vs Play Gol Se acepta la Hipotesis nulaf Predecir el futuro Esta parte lo que hace es predicir el futuro mediante el modelamiento, como el target es categorico entonces nos enfrentamos a un problema de clasificacion si el target hubiese sido numerico entonces seria regression Arbol de decision Los arboles de decision son modelos con estructura de arbol, el resultado final es un arbol con nodos de decision y nodos hoja. Existen varios algoritmos que permiten la construccion de un arbol de decisiones yo ocupare ID3 que emplea dos principales formulas matematicas Entropia y information gain . La entropia nos permite calcular la homogeneidad de la muestra, varia de o - 1, mientras mas cercano sea a 1 mas variado sera nuestro conjunto viceversa si es mas cercano a 0 sera mas homogeneo. Entropia del target. E(y) = $\\sum{(-P(Ci)* (log(P(Ci))/log 2)}$ Entropia de los predictores. E(Y,x) = $\\sum{(P(Ci)* E(Ci)}$ In [96]: #Entropia del target #Tabla auxiliar import math golf = data . groupby ( \"Play Golf\" ) . agg ( Frecuencia = ( \"Play Golf\" , \"count\" )) golf E_golf = 0 for i in golf [ \"Frecuencia\" ]: E_golf = E_golf - i / 14 * math . log ( i / 14 , 2 ) print ( \"Entropia Y = \" , round ( E_golf , 2 )) #E_golf = -golf[\"Frecuencia\"]/14*math.log(golf[\"Frecuencia\"],2) Entropia Y = 0.94 In [143]: outlook = pd . crosstab ( data [ \"Outlook\" ], data [ \"Play Golf\" ], margins = True ) #E_golf_outlook = -outlook[\"All\"]/14 +(math.log(outlook[\"Yes\"]/outlook[\"All\"],2) + math.log(outlook[\"No\"]/outlook[\"All\"],2)) labels = set ( list ( data [ \"Outlook\" ])) def Entropia_pred ( observados ): E = 0 aux = 0 for i in labels : if observados [ \"Yes\" ][ i ] == 0 : a = 0 else : a = math . log2 ( float ( observados [ \"Yes\" ][ i ] / observados [ \"All\" ][ i ])) if observados [ \"No\" ][ i ] == 0 : b = 0 else : b = math . log2 ( float ( observados [ \"No\" ][ i ] / observados [ \"All\" ][ i ])) aux = ( observados [ \"All\" ][ i ] / 14 ) * (( - observados [ \"Yes\" ][ i ] / observados [ \"All\" ][ i ] ) * a - ( observados [ \"No\" ][ i ] / observados [ \"All\" ][ i ]) * b ) E = E + aux print ( \"Entropia de Outlook\" , E ) Entropia_pred ( outlook ) Entropia de Outlook 0.6935361388961918 In [102]: temp = pd . crosstab ( data [ \"Temp\" ], data [ \"Play Golf\" ], margins = True ) labels = set ( list ( data [ \"Temp\" ])) Entropia_pred ( temp ) Entropia de Outlook 0.9110633930116763 In [105]: hum = pd . crosstab ( data [ \"Humidity\" ], data [ \"Play Golf\" ], margins = True ) labels = set ( list ( data [ \"Humidity\" ])) Entropia_pred ( hum ) Entropia de Outlook 0.7884504573082896 In [108]: wind = pd . crosstab ( data [ \"Windy\" ], data [ \"Play Golf\" ], margins = True ) labels = set ( list ( data [ \"Windy\" ])) Entropia_pred ( wind ) Entropia de Outlook 0.8921589282623617 Una vez calculadas las entropias se procede a calcular el gain $Information Gain(Y,x)=E(Y)-E(x)$ gain(play golf, Outlook)= E(Play Golf) - E(Play Golf,Outlook) = 0.94 - 0.69 = 0.25 gain(Play Golf,Temp) = 0.94 - 0.73 =0.21 gain(Play Golf, Humidity) = 0.94 - 0.788 =0.15 gain(Play Golf, Windy) = 0.94 - 0.89 =0.05 El gain mas alto corresponde al nodo raiz por ende sera Outlook, ahora filtramos la data por cada una de las categorias de outlook y las trabajamos a parte para encontrar el nodo que viene de la misma manera que lo habiamos hecho In [111]: filter = data [ data [ \"Outlook\" ] == \"Sunny\" ] temp = pd . crosstab ( filter [ \"Temp\" ], filter [ \"Play Golf\" ], margins = True ) labels = set ( list ( data [ \"Temp\" ])) Entropia_pred ( temp ) Entropia de Outlook 0.14285714285714285 In [114]: hum = pd . crosstab ( filter [ \"Humidity\" ], filter [ \"Play Golf\" ], margins = True ) labels = set ( list ( data [ \"Humidity\" ])) Entropia_pred ( hum ) Entropia de Outlook 0.0 In [117]: wind = pd . crosstab ( filter [ \"Windy\" ], filter [ \"Play Golf\" ], margins = True ) labels = set ( list ( data [ \"Windy\" ])) Entropia_pred ( wind ) Entropia de Outlook 0.3396348215831049 otra vez el gain para determinar que nodo se ubicara despues de outlook == Sunny gain(Play Gol outlook=Sunny,temp) =0.97 - 0.14 gain(Play Golf outlook=Sunny,Windy) = 0.97 - 0.33 gain(Play Golf outlook=Sunny,Humidity) = 0.97 - 0 = 0.97 Entonces el ganador es Humidity In [144]: filtro = data [ data [ \"Outlook\" ] == \"Rainy\" ] temp = pd . crosstab ( filtro [ \"Temp\" ], filtro [ \"Play Golf\" ], margins = True ) labels = set ( list ( filtro [ \"Temp\" ])) Entropia_pred ( temp ) Entropia de Outlook 0.3396348215831049 In [145]: filtro = data [ data [ \"Outlook\" ] == \"Rainy\" ] wind = pd . crosstab ( filtro [ \"Windy\" ], filtro [ \"Play Golf\" ], margins = True ) labels = set ( list ( filtro [ \"Windy\" ])) Entropia_pred ( wind ) Entropia de Outlook 0.0 Entonces calcular el gain seria: Gain(Play Golf Outlook =\"Rainy\", Temp) = 0.97 - 0.95 Gain(Play Golf Outlook =\"Rainy\", Windy) = 0.97 - 0 Dejamos como nodo Windy In [126]: outlook = pd . crosstab ( data [ \"Windy\" ], data [ \"Play Golf\" ]) aux = [] for i in outlook . values : aux . append ( i [ 0 ] + i [ 1 ]) In [129]: outlook [ \"Frecuencia\" ] = aux outlook Out[129]: Play Golf No Yes Frecuencia Windy False 2 6 8 True 3 3 6","tags":"posts","url":"https://c3rssei.github.io/Blog/arboles-de-decisiones.html","loc":"https://c3rssei.github.io/Blog/arboles-de-decisiones.html"}]};