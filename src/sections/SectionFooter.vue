<script setup>
const scrollToTop = () => {
  const scrollStep = window.scrollY / 50
  const scrollToTopLoop = () => {
    if (window.scrollY > 0) {
      window.scrollTo(0, window.scrollY - scrollStep)
      requestAnimationFrame(scrollToTopLoop)
    }
  }
  scrollToTopLoop()
}
</script>

<template>
 <footer class="pit-footer">
      <div class="pit-footer__wrapper">
        <div class="pit-footer__logo">
          <img src="@/assets/img/footer/logo-footer.svg" alt="" />
        </div>
        <div class="pit-footer__menu">
          <div class="pit-footer__menu-left" >
          <router-link to="#"><span class="pit-footer__nav-item">Home</span></router-link>
          <router-link to="#"><span class="pit-footer__nav-item">About Us</span></router-link>
            <router-link to="#"><span class="pit-footer__nav-item">Privacy</span></router-link>
            <router-link to="#"><span class="pit-footer__nav-item">T&Cs</span></router-link>
          </div>

          <div class="pit-footer__menu-right" >
            <a class="pit-footer__menu-link" href="#" target="_blank">
             <img src="@/assets/img/footer/footer-icon-m.svg" alt="" />
            </a>
            <a class="pit-footer__menu-link" href="#" target="_blank">
             <img src="@/assets/img/footer/footer-icon-f.svg" alt="" />
            </a>
            <a class="pit-footer__menu-link" href="#" target="_blank">
             <img src="@/assets/img/footer/footer-icon-t.svg" alt="" />
            </a>
            <a class="pit-footer__menu-link" href="#" target="_blank">
             <img src="@/assets/img/footer/footer-icon-i.svg" alt="" />
            </a>
            <a class="pit-footer__menu-link" href="#" target="_blank">
            <img src="@/assets/img/footer/footer-icon-y.svg" alt="" />
            </a>
          </div>
        </div>
        <div class="pit-footer__info">
          <span>Web Design by LWDA</span>
        </div>
      </div>
    </footer> 
</template>

