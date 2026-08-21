/**
 * curriculum-core.js
 * -----------------------------------------------------------------
 * ISOMORPHIC core: same functions Node (build script / SSR) aur
 * browser dono me chalte hain — koi DOM dependency nahi hai yahan,
 * sirf pure string building hoti hai. Isliye SEO-safe HTML yahi se
 * generate hota hai.
 *
 * Node me:   const core = require('./curriculum-core.js');
 * Browser me: window.CurriculumCore
 * -----------------------------------------------------------------
 */
(function (root, factory) {
    if (typeof module === "object" && module.exports) {
      module.exports = factory();
    } else {
      root.CurriculumCore = factory();
    }
  })(typeof self !== "undefined" ? self : this, function () {
    "use strict";
  
    // ------------------------------------------------------------------
    // URL se course-type + city detect karna (url string leta hai, DOM nahi)
    // ------------------------------------------------------------------
    function detectContextFromUrl(urlOrPath) {
      const path = String(urlOrPath || "").toLowerCase();
      const isDataAnalyticsPage = /data-analytics|data-analyst/.test(path);
  
      let city = "Delhi";
      const cityMatch = path.match(/-in-([a-z0-9-]+?)(?:\.html)?\/?(?:[?#].*)?$/);
      if (cityMatch && cityMatch[1]) {
        city = cityMatch[1]
          .split("-")
          .filter(Boolean)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
      }
      return { isDataAnalyticsPage, city };
    }
  
    // ------------------------------------------------------------------
    // DATA
    // ------------------------------------------------------------------
    function buildCurriculumData(city) {
      return {
        sectionId: "curriculum",
        accordionId: "accordion-inv",
        title: {
          main: "Curriculums for Data Analytics Training",
          highlight: `Courses in ${city}`,
        },
        sidebar: {
          heading: "Data Analytics Curriculum",
          description:
            "The curriculum has been designed by faculty from IITs, and Expert Industry Professionals.",
          stats: [
            { icon: "/img/time.png", alt: "time", value: "120+", label: "Hours of Content" },
            {
              icon: "/img/tools/live1-removebg-preview.png",
              alt: "live1-removebg-preview",
              value: "75+",
              label: "Live Sessions",
            },
            { icon: "/img/tools.png", alt: "tools", value: "10+", label: "Tools and Software" },
          ],
          downloadBtn: {
            text: "Download Curriculum",
            onclickFn: "(showForm(), setDownload('DataAnalyticsBtn'))",
          },
        },
        intro: {
          moduleHeading: "Set the Basics Right",
          paragraphs: [
            `At Uncodemy, we offer a comprehensive Data Analytics training course in ${city} designed to equip students with the skills and knowledge required to excel in the field of data analysis. Our curriculum is meticulously crafted to cover all essential aspects of data analytics, ensuring that our students gain a deep understanding and practical experience.`,
            "Here’s a detailed overview of what you can expect from our Data Analytics course curriculum:",
          ],
        },
        modules: [
          {
            heading: "1. Python for Data Analytics",
            topics: [
              { title: "Python Basics", points: ["Need for Programming","Advantages of Programming","Overview of Python","Organizations using Python","Python Applications in Various Domains","Python Installation","Variables","Operands and Expressions","Conditional Statements","Loops","Command Line Arguments"] },
              { title: "Data Structure and File Operations", points: ["Method of Accepting User Input and eval Function","Python - Files Input/Output Functions","Lists and Related Operations","Tuples and Related Operations","Strings and Related Operations","Sets and Related Operations","Dictionaries and Related Operations"] },
              { title: "Functions and Object Oriented Programming", points: ["User-Defined Functions","Concept of Return Statement","Concept of name=” main ”","Function Parameters","Different Types of Arguments","Global Variables","Global Keyword","Variable Scope and Returning Values","Lambda Functions","Various Built-In Functions","Introduction to Object-Oriented Concepts","Built-In Class Attributes","Public, Protected and Private Attributes, and Methods","Class Variable and Instance Variable","Constructor and Destructor","Decorator in Python","Core Object-Oriented Principles","Inheritance and Its Types","Method Resolution Order","Overloading","Overriding","Getter and Setter Methods","Inheritance-In-Class Case Study"] },
              { title: "Working with Modules and Handling Exceptions", points: ["Standard Libraries","Packages and Import Statements","Topics : Working with Modules and Handling Exceptions","Info@uncodemy.com | +91-9818366550 | www.uncodemy.com","Reload Function","Important Modules in Python","Sys Module","Os Module","Math Module","Date-Time Module","Random Module","JSON Module","Regular Expression","Exception Handling"] },
              { title: "Introduction to NumPy", points: ["Basics of Data Analysis","NumPy - Arrays","Operations on Arrays","Indexing Slicing and Iterating","NumPy ArrayAttributes","Matrix Product","NumPy Functions","Functions","Array Manipulation","File Handling Using NumPy","Array Creation and Logic Functions","File Handling Using Numpy"] },
              { title: "Data Manipulation using pandas", points: ["Introduction to pandas","Data structures in pandas","Series","Data Frames","Importing and Exporting Files in Python","Basic Functionalities of a Data Object","Merging of Data Objects","Concatenation of Data Objects","Types of Joins on Data Objects","Data Cleaning using pandas","Exploring Datasets"] },
            ],
          },
          {
            heading: "2. Data Science Primer and Statistics",
            topics: [
              { title: "Basics of Data Science", points: ["What is Data Science?","What does Data Science involve?","Era of Data Science","Business Intelligence vs Data Science","Life cycle of Data Science","Tools of Data Science","Application of Data Science"] },
              { title: "Exploratory Data Analysis", points: ["Introduction","Stages of Analytics","CRISP DM Data Life Cycle","Data Types","Introduction to EDA","First Business Moment Decision","Second Business Moment Decision","Third Business Moment Decision","Fourth Business Moment Decision","Correlation"] },
              { title: "Feature Engineering", points: ["What is Feature","Feature Engineering","Feature Engineering Process","Benefit","Feature Engineering Techniques"] },
              { title: "Inferential Statistics &amp; Hypothesis Testing", points: ["Basics Of Probability","Discrete Probability Distributions","Continuous Probability Distributions","Central Limit Theorem","Concepts Of Hypothesis Testing - I: Null And Alternate Hypothesis, Making","A Decision, And Critical Value Method","Concepts Of Hypothesis Testing - II: P-Value Method And Types Of Errors","Industry Demonstration Of Hypothesis Testing: Two-Sample Mean And","Proportion Test, A/B Testing"] },
            ],
          },
          {
            heading: "3. Machine Learning",
            topics: [
              { title: "Linear Regression", points: ["Simple Linear Regression","Simple Linear Regression In Python","Multiple Linear Regression","Multiple Linear Regression In Python","Industry Relevance Of Linear Regression"] },
              { title: "Logistic Regression", points: ["Univariate Logistic Regression","Multivariate Logistic Regression: Model","Building And Evaluation","Logistic Regression:","Industry Applications"] },
              { title: "KNN classifier", points: ["Data mining classifier technique","Application of KNN classifier","Lazy learner classifier","Altering hyperparameter(k) for better accuracy"] },
              { title: "Support Vector classifier", points: ["Black box","SVM hyperplane","Max margin hyperplane","Kernel tricks for non linear spaces"] },
              { title: "Decision Tree Classifier", points: ["Rule based classification method","Different nodes for develop decision trees","Discretization","Entropy","Greedy approach","Information gain"] },
            ],
          },
          {
            heading: "4. SQL",
            topics: [
              { title: "Getting Started and Creating, Selecting &amp; Retrieving Data with SQL", points: ["Introduction to Databases","How to create a Database instance on Cloud?","Provision a Cloud hosted Database instance.","What is SQL?","Thinking About Your Data","Relational vs. Transactional Models ER Diagram","CREATE Table Statement and DROP tables","UPDATE and DELETE Statements","Retrieving Data with a SELECT Statement","Creating Temporary Tables","Adding Comments to SQL"] },
              { title: "Filtering, Sorting, and Calculating Data with SQL", points: ["Basics of Filtering with SQL","Advanced Filtering: IN, OR, and NOT","Using Wildcards in SQL","Sorting with ORDER BY","Math Operations","Aggregate Functions","Grouping Data with SQL"] },
              { title: "Subqueries and Joins in SQL", points: ["Using Subqueries","Subquery Best Practices and Considerations","Joining Tables","Cartesian (Cross) Joins","Inner Joins","Aliases and Self Joins","Advanced Joins: Left, Right, and Full Outer Joins","Unions"] },
              { title: "Modifying and Analyzing Data with SQL", points: ["Working with Text Strings","Working with Date and Time Strings","Date and Time Strings Examples","Case Statements","Views","Data Governance and Profiling","Using SQL for Data Science"] },
              { title: "Accessing Databases using Python", points: ["How to access databases using Python?","Writing code using DB-API","Connecting to a database using DB API","Create Database Credentials","Connecting to a database instance","Creating tables, loading, inserting, data and querying data","Analysing data with Python"] },
            ],
          },
          {
            heading: "5. Excel",
            topics: [
              { title: "Analyzing and Visualizing Data using Excel", points: ["Input data &amp; handling large spreadsheets","Tricks to get your work done faster","Automating data analysis (Excel VLOOKUP, IF Function, ROUND and more)","Transforming messy data into shape","Cleaning, Processing and Organizing large data","Spreadsheet design principles","Drop-down lists in Excel and adding data validation to the cells.","Creating Charts &amp; Interactive reports with Excel Pivot Tables, PivotCharts, Slicers and Timelines","Functions like: - COUNTIFS, COUNT, SUMIFS, AVERAGE and many more.","Excel features: - Sort, Filter, Search &amp; Replace Go to Special etc...","Importing and Transforming data (with Power Query)","Customize the Microsoft Excel interface","Formatting correctly for professional reports.","Commenting on cells.","Automate data entry with Autofill and Flash-fill.","Writing Excel formulas &amp; referencing to other workbooks / worksheets.","Printing options","Charts beyond column and bar charts: - Pareto chart, Histogram, Treemap, Sunburst","charts &amp; more"] },
              { title: "Excel for Data Analytics", points: ["Introduction to Excel for Data Analytics","Data Cleaning in Excel","Formulas and Functions","Lookup Functions","Conditional Functions","Sorting and Filtering","Pivot Tables","Pivot Charts","Data Visualization","Excel Dashboards","Advanced Excel Analytics"] },
            ],
          },
          {
            heading: "6. Tableau",
            topics: [
              { title: "Analyzing and Visualizing Data using Tableau", points: ["Introduction to Data Visualization","Tableau Introduction and Tableau Architecture","Exploring Data using Tableau","Working with Data using Tableau including Data Extraction and","Blending","Various Charts in Tableau(Basics to Advanced)","Sorting-Quick Sort, Sort from Axis, Legends, Axis, Sort by Fields","Filtering- Dimension Filters, Measure Filters, Date Filters, Tableau","Context Filters","Groups , Sets and Combined Sets","Reference Lines, Bands and Distribution","Parameters, Dynamic Parameters and Actions","Forecasting-Exponential Smoothening Techniques","Clustering","Calculated Fields in Tableau, Quick Tables","Tableau Mapping Features","Tableau Dashboards, Dashboards Action and Stories"] },
              { title: "Data Visualization using Tableau", points: ["Introduction to Tableau","Tableau Interface and Navigation","Connecting Data Sources","Data Preparation in Tableau","Dimensions and Measures","Charts and Visualizations","Filters and Sorting","Calculated Fields","Dashboards","Interactive Dashboards","Tableau Stories","Publishing and Sharing Dashboards"] },
            ],
          },
          {
            heading: "7. Power BI",
            topics: [
              { title: "Introduction To Power BI", points: ["Introduction to Power BI – Need, Importance","Power BI – Advantages and Scalable Options","Power BI Data Source Library and DW Files","Business Analyst Tools, MS Cloud Tools","Power BI Installation","Power BI Desktop – Instalation, Usage","Sample Reports and Visualization Controls","Understanding Desktop &amp; Mobile Editions","Report Rendering Options and End User Access"] },
              { title: "Creating Power BI Reports, Auto Filters", points: ["Report Design with Databse Tables","Report Visuals, Fields and UI Options","Reports with Multiple Pages and Advantages","Pages with Multiple Visualizations. Data Access","“GET DATA” Options and Report Fields, Filters","Report View Options: Full, Fit Page, Width Scale","Report Design using Databases &amp; Queries"] },
            ],
          },
          {
            heading: "8. Artificial Intelligence (AI) & Generative AI",
            topics: [
              { title: "Introduction to AI and its Applications", points: ["What is Artificial Intelligence?","History and Evolution of AI","Types of AI: Narrow AI, General AI, Super AI","AI vs Machine Learning vs Deep Learning","Real-world Applications of AI","AI in Business, Healthcare, Finance, and Retail","Ethical Considerations in AI"] },
              { title: "Generative AI Fundamentals", points: ["What is Generative AI?","How Generative AI Works: Overview of GANs, VAEs, and Transformers","Popular Generative AI Models: GPT, DALL-E, Stable Diffusion","Prompt Engineering: Basics and Best Practices","Use Cases of Generative AI: Content Creation, Code Generation, Image Synthesis","Ethical and Bias Issues in Generative AI"] },
              { title: "Prompt Engineering & AI Tools for Analysts", points: ["Introduction to Generative AI and Large Language Models (LLMs)","Prompt Engineering fundamentals for data tasks","Using ChatGPT/Claude for Exploratory Data Analysis (EDA)","AI-assisted data cleaning and preprocessing","Writing and debugging SQL queries using AI tools","AI-assisted Python scripting for data analysis","Using Copilot in Microsoft Excel for automation","Power BI Copilot for report and dashboard generation","AI-generated data visualizations and insights summaries","Automating repetitive analytics tasks with AI","Ethical use of AI in data analytics (bias, accuracy, data privacy)","Case Study: Using AI to speed up a real-world analytics project"] },
              { title: "Natural Language Processing (NLP) and LLMs", points: ["Introduction to NLP","Tokenization, Stemming, Lemmatization","Bag of Words, TF-IDF, Word Embeddings (Word2Vec, GloVe)","Transformers and Attention Mechanism","Large Language Models (LLMs): GPT, BERT, LLaMA","Fine-tuning LLMs for Specific Tasks","Building Chatbots and Conversational AI"] },
              { title: "Deep Learning for AI", points: ["Neural Networks: Perceptron, Activation Functions","Feedforward Neural Networks (FNN)","Convolutional Neural Networks (CNN) for Image Data","Recurrent Neural Networks (RNN) and LSTMs for Sequential Data","Autoencoders and Variational Autoencoders (VAEs)","Introduction to GANs (Generative Adversarial Networks)","Using TensorFlow / Keras for Deep Learning"] },
              { title: "AI Implementation and Deployment", points: ["Building AI Models using Python (Scikit-learn, TensorFlow, PyTorch)","Model Evaluation and Hyperparameter Tuning","Deploying AI Models using Flask / FastAPI","Introduction to MLOps","AI Model Monitoring and Maintenance","Using Cloud AI Services: AWS SageMaker, Azure AI, Google AI","Building End-to-End AI Applications"] },
              { title: "Responsible AI and Future Trends", points: ["AI Fairness, Accountability, and Transparency","Bias Detection and Mitigation in AI Models","Explainable AI (XAI)","Data Privacy and Security in AI","Emerging Trends: Multimodal AI, Self-supervised Learning","AI and the Future of Work","Career Opportunities in AI and Gen AI"] },
            ],
          },
          {
            heading: "9. R Programming for Data Analytics",
            topics: [
              { title: "R Programming for Data Analytics", points: ["Introduction to R","R Programming Basics","Variables and Data Types","Operators and Expressions","Conditional Statements","Loops and Functions","Data Structures in R","Vectors, Lists and Matrices","Data Frames and Factors","Data Import and Export","Data Manipulation using R","Data Cleaning using R"] },
            ],
          },
          {
            heading: "10. Data Visualization with ggplot2",
            topics: [
              { title: "Data Visualization using R", points: ["Introduction to Data Visualization","Introduction to ggplot2","Basic Plots using ggplot2","Bar Charts","Histograms","Box Plots","Scatter Plots","Line Charts","Customizing ggplot2 Visualizations","Themes, Labels and Annotations","Multiple Plots and Facets"] },
            ],
          },
          {
            heading: "11. Business Intelligence with Looker",
            topics: [
              { title: "Business Intelligence using Looker", points: ["Introduction to Business Intelligence","Introduction to Looker","Looker Interface and Navigation","Connecting Data Sources","Data Exploration in Looker","Creating Reports and Dashboards","Filters and Dimensions","Measures and Visualizations","Creating Interactive Dashboards","LookML Basics","Sharing and Scheduling Reports"] },
            ],
          },
          {
            heading: "12. MATLAB for Data Analysis",
            topics: [
              { title: "MATLAB for Data Analysis", points: ["Introduction to MATLAB","MATLAB Environment and Interface","Variables and Data Types","Arrays and Matrices","Operators and Expressions","Conditional Statements and Loops","Functions in MATLAB","Data Import and Export","Data Manipulation using MATLAB","Data Visualization using MATLAB","Statistical Analysis using MATLAB"] },
            ],
          },
        ],
        outro: {
          paragraphs: [
            `Uncodemy's Data Analytics training course in ${city} not only covers these fundamental topics but also includes hands-on experience with real-world data, ensuring that students are well-prepared for the demands of the industry. Our curriculum is designed to provide a balanced mix of theoretical knowledge and practical skills, making it one of the best data analytics courses available.`,
            `By choosing Uncodemy, you are opting for a program that is tailored to meet the needs of aspiring data analysts, offering a robust education in a field that is both dynamic and in high demand. Whether you are looking for offline or online data analytics courses in ${city}, our training programs are structured to provide the best learning experience possible.`,
          ],
        },
      };
    }
  
    // ------------------------------------------------------------------
    // STRING BUILDERS (pure — no DOM)
    // ------------------------------------------------------------------
    function buildPointsList(points) {
      return points.map((p) => `<li>${p}</li>`).join("\n");
    }
  
    function buildTopicCard(topic, accordionId, idCounterRef) {
      idCounterRef.value += 1;
      const id = idCounterRef.value;
      const headingId = `heading${id}`;
      const collapseId = `collapse${id}`;
      return `
        <div class="card">
          <div class="card-header" id="${headingId}">
            <a class="collapsed" data-toggle="collapse" data-parent="#${accordionId}" href="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">
              <span class="mb-0">${topic.title}<i class="fa fa-caret-down"></i></span>
            </a>
          </div>
          <div id="${collapseId}" class="collapse" role="tabpanel" aria-labelledby="${headingId}" data-parent="#${accordionId}">
            <div class="card-body cer">
              <div class="row">
                <div class="col-lg-12">
                  ${buildPointsList(topic.points)}
                </div>
              </div>
            </div>
          </div>
        </div>`;
    }
  
    function buildModule(module, accordionId, idCounterRef) {
      const topicCards = module.topics.map((t) => buildTopicCard(t, accordionId, idCounterRef)).join("\n");
      return `
        <h4 class="module-heading">${module.heading}</h4>
        ${topicCards}`;
    }
  
    function buildSidebar(sidebar) {
      const stats = sidebar.stats
        .map(
          (s) => `
            <div class="sy-img-con">
              <div class="syllabus-img">
                <img class="lazy-load" data-src="${s.icon}" alt="${s.alt}" src="${s.icon}">
              </div>
              <div class="syllabus-content">
                <span>${s.value}</span>
                <p>${s.label}</p>
              </div>
            </div>`
        )
        .join("\n");
      return `
        <div class="col-xl-4 col-lg-5 col-md-5 col-12 mobile-display-none">
          <div class="curriculum">
            <span class="curr-head">${sidebar.heading}</span>
            <p>${sidebar.description}</p>
            ${stats}
            <button type="button" class="down-cum" data-toggle="modal" download onclick="${sidebar.downloadBtn.onclickFn}">
              ${sidebar.downloadBtn.text}
            </button>
          </div>
        </div>`;
    }
  
    function buildIntro(intro) {
      return intro.paragraphs.map((p) => `<p>${p}</p>`).join("\n");
    }
  
    function buildOutro(outro) {
      return outro.paragraphs.map((p) => `<p>${p}</p>`).join("\n");
    }
  
    /**
     * renderCurriculumHTML(city)
     * Returns the FULL inner HTML string for the curriculum section.
     * Same output whether called from Node (build script) or a browser.
     */
    function renderCurriculumHTML(city) {
      const data = buildCurriculumData(city || "Delhi");
      const idCounterRef = { value: 8 }; // pehla topic id "9" se start
      const modulesHtml = data.modules.map((m) => buildModule(m, data.accordionId, idCounterRef)).join("\n");
  
      return `<div class="container sylla containers">
          <div class="section-title text-center position-relative">
            <h2>
              ${data.title.main}
              <b style="color: #ff5421" class="d-inline-block position-relative text-capitalize">${data.title.highlight}</b>
            </h2>
          </div>
          <div class="row row-reverse">
            ${buildSidebar(data.sidebar)}
            <div class="col-xl-8 col-lg-7 col-md-7 col-12">
              <div class="accordion md-accordion" id="${data.accordionId}">
                <div class="syllabus-newbox">
                  <strong class="module-heading">${data.intro.moduleHeading}</strong>
                  ${buildIntro(data.intro)}
                  ${modulesHtml}
                  ${buildOutro(data.outro)}
                </div>
              </div>
            </div>
          </div>
        </div>`;
    }
  
    return {
      detectContextFromUrl,
      buildCurriculumData,
      renderCurriculumHTML,
    };
  });