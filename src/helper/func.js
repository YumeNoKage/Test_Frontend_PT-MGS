import jsPDF from 'jspdf' 
import 'jspdf-autotable'

var helperFunc = {
  methods: {
    generatePdf(headers, data, name){
      const doc = new jsPDF({
        orientation: "p", //set orientation
        unit: "pt", //set unit for document
        format: "letter" //set document standard
      });

      const listCol = {}
      headers.map(item => {
        listCol[item.dataKey] = {fillColor: false}
      })

      doc.autoTable(headers, data, {
          styles: {
            fillColor: [51,51,51],
            lineColor: 240, 
            lineWidth: 1,
          },
          
          columnStyles: listCol,
          margin: { top: 50 },
          // eslint-disable-next-line no-unused-vars
          addPageContent: function(data) {
            doc.text("", 40, 30);
          }
      });
      doc.save(`${name}.pdf`);
    },
  }
}

export default helperFunc