/**
 * CULTURE HOUSE — Production Atelier
 * Custom Front-End Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // 2. Case Studies Filter
  const filterChips = document.querySelectorAll('.filter-chip');
  const caseCards = document.querySelectorAll('.case-card');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');

      caseCards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'grid';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 3. Realistic Ballpark Production Cost Estimator
  const estRange = document.getElementById('estRange');
  const estGuestLabel = document.getElementById('estGuestLabel');
  const estType = document.getElementById('estType');
  const estTotalFigure = document.getElementById('estTotalFigure');

  const baselineCostMap = {
    destination_wedding: { basePerHead: 14000, fixedStage: 1800000 },
    corporate_summit: { basePerHead: 7500, fixedStage: 1200000 },
    concert_festival: { basePerHead: 3500, fixedStage: 3500000 },
    private_soirée: { basePerHead: 22000, fixedStage: 800000 }
  };

  function updateEstimate() {
    if (!estRange || !estType) return;

    const guestCount = parseInt(estRange.value, 10);
    const selectedType = estType.value;
    estGuestLabel.innerText = `${guestCount} Guests`;

    const config = baselineCostMap[selectedType] || baselineCostMap.destination_wedding;
    const totalEst = config.fixedStage + (guestCount * config.basePerHead);

    const minLakhs = Math.round((totalEst * 0.9) / 100000);
    const maxLakhs = Math.round((totalEst * 1.15) / 100000);

    if (minLakhs >= 100) {
      const minCr = (minLakhs / 100).toFixed(2);
      const maxCr = (maxLakhs / 100).toFixed(2);
      estTotalFigure.innerText = `₹ ${minCr} – ${maxCr} Crores`;
    } else {
      estTotalFigure.innerText = `₹ ${minLakhs} – ${maxLakhs} Lakhs`;
    }
  }

  if (estRange && estType) {
    estRange.addEventListener('input', updateEstimate);
    estType.addEventListener('change', updateEstimate);
    updateEstimate();
  }

  // 4. Opt-In Contact Form Submission
  const optInForm = document.getElementById('optInContactForm');
  const contactStatus = document.getElementById('contactFormStatus');
  const btnSubmitContact = document.getElementById('btnSubmitContact');

  if (optInForm) {
    optInForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const directCommCheck = document.getElementById('optInDirectComm');
      const termsCheck = document.getElementById('optInTerms');

      if (!directCommCheck.checked || !termsCheck.checked) {
        alert('Please accept the required communication consent and Terms & Conditions checkboxes to proceed.');
        return;
      }

      const origBtnText = btnSubmitContact.innerHTML;
      btnSubmitContact.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authorizing & Logging Brief...';
      btnSubmitContact.disabled = true;

      setTimeout(() => {
        btnSubmitContact.innerHTML = origBtnText;
        btnSubmitContact.disabled = false;
        contactStatus.classList.remove('hidden');
        optInForm.reset();

        setTimeout(() => {
          contactStatus.classList.add('hidden');
        }, 8000);
      }, 1000);
    });
  }

  // 5. Clean Commission Brief Submission on index.html
  const briefForm = document.getElementById('projectBriefForm');
  const responseBox = document.getElementById('rfpResponse');
  const submitBtn = document.getElementById('btnSubmitRfp');

  if (briefForm) {
    briefForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const origText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Submitting Request to Ops...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = origText;
        submitBtn.disabled = false;
        responseBox.classList.remove('hidden');
        briefForm.reset();

        setTimeout(() => {
          responseBox.classList.add('hidden');
        }, 10000);
      }, 900);
    });
  }

});
