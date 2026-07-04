import Swal from 'sweetalert2'

export function useSweetAlert(){

    //** 01 -  For confirming delete  */
    function confirmDelete(title = 'Are you sure?', text = 'This action cannot be undone!'){
        return Swal.fire({
            title,
            text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete it',
            cancelButtonText: 'Cancel'
        })
    }

    //** 02 - Success  */
    function success(message = 'Success!') {
        return Swal.fire({
            icon: 'success',
            title: message,
            timer: 2000,
            showConfirmButton: false
        })
    }

    //** 03 - Error  */
    function error(message = 'Something went wrong!') {
        return Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
            confirmButtonColor: '#dc3545'
        })
    }

    //** 04 - Confirm  */
    function confirm(title, text = '') {
        return Swal.fire({
            title,
            text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        })
    }

    return { confirmDelete, success, error, confirm }
}