exports.stat = {
    tablemodule: function(table_content){
        return `<!DOCTYPE html>
        <body><table style="border: 2px solid #000;">${table_content}</table></body>`;
    },
    rowmodule: function(row, status){
        // console.log(row);
        if (row.includes(status)){
            return `<tr style="border-bottom: 1px solid #ccc;">${row}</tr>`;
        }
        else{
            return ''
        }
    },
    headmodule: function(head){
        return `<th style="border: 1px solid #000;">${head}</th>`;
    },
    datamodule: function(col){
        if (col == 'Success'){
            return `<td style="color: green;border: 1px solid #000;"><b>${col}</b></td>`
        }
        else{
            return `<td style="border: 1px solid #000;">${col}</td>`;
        }
        
    },
    tableFormatter: function(data, status){
        let header = '';
        for(let val in data[0]){
            header += this.headmodule(val);
        }
        let rows_html = '';  
        for(let val in data){
            
            let row = '';
            for(let col in data[val]){
                row += this.datamodule(data[val][col]);
                // console.log(row);
            }
            
            rows_html += this.rowmodule(row, status);
            // console.log(rows_html);
        }
        let header_html = this.tablemodule(header+rows_html);
        return header_html;
    }
};
