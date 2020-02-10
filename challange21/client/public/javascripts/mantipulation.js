const apiUrl = "http://localhost:3000/api";
$(document).ready(() => {
    loadData();
    $('#form-control').submit((e) => {
        e.preventDefault();
        saveData();
    });

    $('table tbody').on('click', '.btn-edit', (event) => {
        editData($(event.currentTarget).attr('data-id'))
    })
})

const loadData = () => {
    $.ajax({
            method: 'GET',
            url: `${apiUrl}`,
            dataType: 'json'
        })
        .done((result) => {
            let html = '';
            console.log(result);
            const data = result.result
            data.forEach(item => {
                html += `<tr>
                            <td>${item.id}</td>
                            <td>${item.string}</td>
                            <td>${item.integer}</td>
                            <td>${item.float}</td>
                            <td>${item.date}</td>
                            <td>${item.boolean ? 'true' : 'false'}</td>
                            <td>
                                <button type="button" class="btn btn-success btn-edit"
                                    data-id="${item.id}">Edit</button>
                                <button type="button" class="btn btn-danger btn-delete"
                                    data-id="${item.id}">Delete</button>
                            </tr>`
            })
            $('table tbody').html(html);
        })
}