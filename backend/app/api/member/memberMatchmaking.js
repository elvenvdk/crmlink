const { Router } = require('express');

const { authenticatedUser } = require('../user/helper');
const MemberTable = require('../../member/table');

const router = Router();

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      MemberTable.getMemberMatchmaking({ id })
        .then(member => res.json(member))
        .catch(error => {
          throw error;
        });
    })
    .catch(error => next(error));
});

router.post('/', (req, res, next) => {
  const {
    anoko_id,
    id_registrationi_complete,
    category,
    age,
    investment_status,
    place_of_upbringing,
    birthplace,
    school_affiliations,
    club_afiliations,
    prev_companies,
    personal_description,
    children,
    business_description,
    favorite_artists_books_podcasts
  } = req.body;
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      MemberTable.crearteMemberMatchMaking({
        anoko_id,
        id_registrationi_complete,
        category,
        age,
        investment_status,
        place_of_upbringing,
        birthplace,
        school_affiliations,
        club_afiliations,
        prev_companies,
        personal_description,
        children,
        business_description,
        favorite_artists_books_podcasts
      })
        .then(() =>
          res.send({ message: 'Member match making successfully created ' })
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
    id_registrationi_complete,
    category,
    age,
    investment_status,
    place_of_upbringing,
    birthplace,
    school_affiliations,
    club_afiliations,
    prev_companies,
    personal_description,
    children,
    business_description,
    favorite_artists_books_podcasts
  } = req.body;
  authenticatedUser({ sessionString: req.cookies.sessionString })
    .then(() => {
      MemberTable.crearteMemberMatchMaking({
        anoko_id: id,
        id_registrationi_complete,
        category,
        age,
        investment_status,
        place_of_upbringing,
        birthplace,
        school_affiliations,
        club_afiliations,
        prev_companies,
        personal_description,
        children,
        business_description,
        favorite_artists_books_podcasts
      })
        .then(() =>
          res.send({ message: 'Member match making successfully updated ' })
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
      MemberTable.removeMemberMatchmaking({ id })
        .then(() =>
          res.send({ message: 'Member match making successfully deleted' })
        )
        .catch(error => {
          throw error;
        });
    })
    .catch(error => next(error));
});

module.exports = router;
