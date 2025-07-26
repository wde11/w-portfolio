document.addEventListener('DOMContentLoaded', function() {
            // Select all links that should trigger the SweetAlert confirmation
            const confirmLinks = document.querySelectorAll('.confirm-link');

            confirmLinks.forEach(link => {
                link.addEventListener('click', function(event) {
                    // Prevent the default link behavior immediately
                    event.preventDefault(); 
                    
                    const targetUrl = this.href; // Get the URL the link points to

                    Swal.fire({
                        title: 'Do you want to continue?',
                        text: "You are about to navigate to a different page.",
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, continue!',
                        cancelButtonText: 'No, stay here'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // If the user clicks "Yes, continue!", navigate to the URL
                            window.location.href = targetUrl;
                        }
                    });
                });
            });
        });