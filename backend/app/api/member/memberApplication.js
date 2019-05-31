const { Router } = require('express');

const { authenticatedUser } = require('../user/helper');
const MemberTable = require('../../member/table');

const router = Router();

router.get('/', (req, res, next) => {
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      MemberTable.getMemberApplications()
        .then(members => res.json(members))
        .catch(error => {
          throw error;
        });
    })
    .catch(error => next(error));
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      MemberTable.getMemberApplication({ id })
        .then(member => res.json(member))
        .catch(error => {
          throw error;
        });
    })
    .catch(error => next(error));
});

router.post('/create', (req, res, next) => {
  const {
    first_name,
    last_name,
    pref_name,
    email,
    phone,
    social_media,
    member_referral,
    how_did_you_find_out,
    member_category,
    industry,
    company,
    title,
    current_city,
    current_state,
    first_contact,
    what_do_you_want_from_anoko,
    what_can_you_contribute_to_the_community,
    how_will_you_use_the_space,
    what_does_wealth_mean_to_you
  } = req.body;

  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      MemberTable.createMemberApplication({
        first_name,
        last_name,
        pref_name,
        email,
        phone,
        social_media,
        member_referral,
        how_did_you_find_out,
        member_category,
        industry,
        company,
        title,
        current_city,
        current_state,
        first_contact,
        what_do_you_want_from_anoko,
        what_can_you_contribute_to_the_community,
        how_will_you_use_the_space,
        what_does_wealth_mean_to_you
      })
        .then(() =>
          res
            .status(201)
            .send({ message: 'Member application successfully created' })
        )
        .catch(error => {
          throw error;
        });
    })
    .catch(error => next(error));
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    pref_name,
    email,
    phone,
    social_media,
    member_referral,
    how_did_you_find_out,
    member_category,
    industry,
    company,
    title,
    current_city,
    current_state,
    first_contact,
    what_do_you_want_from_anoko,
    what_can_you_contribute_to_the_community,
    how_will_you_use_the_space,
    what_does_wealth_mean_to_you
  } = req.body;

  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      MemberTable.udpateMemberApplication({
        id,
        first_name,
        last_name,
        pref_name,
        email,
        phone,
        social_media,
        member_referral,
        how_did_you_find_out,
        member_category,
        industry,
        company,
        title,
        current_city,
        current_state,
        first_contact,
        what_do_you_want_from_anoko,
        what_can_you_contribute_to_the_community,
        how_will_you_use_the_space,
        what_does_wealth_mean_to_you
      })
        .then(() =>
          res
            .status(201)
            .send({ message: 'Member application successfully updated' })
        )
        .catch(error => {
          throw error;
        });
    })
    .catch(error => next(error));
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      MemberTable.deleteMemberApplication({ id })
        .then(() =>
          res.send({ message: 'Member aplication successfully deleted' })
        )
        .catch(error => {
          throw error;
        });
    })
    .catch(error => next(error));
});

module.exports = router;
