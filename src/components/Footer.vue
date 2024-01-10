<template>
    <footer class="col-12 mt-5">
        <div class="container">
            <div class="row" id="footer-wrapp">
                <div class="col-lg-3 col-md-12 col-sm-12" id="fpop-catog">
                    <h2>POPULAR CATEGORIES</h2>
                    <ul>
                        <li> <a href="#">Cars</a> </li>
                        <li> <a href="#">Flats for rent</a> </li>
                        <li> <a href="#">Mobile phones</a> </li>
                        <li> <a href="#">Jobs</a> </li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-12 col-sm-12" id="f-about">
                    <h2>About Us</h2>
                    <ul>
                        <li> <a href="#">About Dubizzle Group</a> </li>
                        <li> <a href="#">OLX Blog</a> </li>
                        <li> <a href="#">Contact Us</a> </li>
                        <li> <a href="#">OLX for Businesses</a> </li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-12 col-sm-12" id="f-olx">
                    <h2>OLX</h2>
                    <ul>
                        <li> <a href="#">Help</a> </li>
                        <li> <a href="#">Sitemap</a> </li>
                        <li> <a href="#">Terms of use</a> </li>
                        <li> <a href="#">Privacy Policy</a> </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
}
</script>
<style scoped>
footer {
    background-color: #ebeeef;
    padding: 1rem 0 1.4rem;
    border-top: 1px solid rgba(0, 47, 52, .2);
}

div#footer-wrapp {
    justify-content: space-between;
    padding: 18px 0px;
    align-items: center;
}

#footer-wrapp h2 {
    font-weight: 700;
    font-size: 1.1rem;
}

#footer-wrapp ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

#footer-wrapp ul li a {
    color: rgba(0, 47, 52, .64);
    text-decoration: none;
    cursor: pointer;
    font-size: 1.004rem;
}</style>