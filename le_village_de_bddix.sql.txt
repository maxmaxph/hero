--1. Liste des potions : Numéro, libellé, formule et constituant principal. (5 lignes)
select num_potion, lib_potion, formule, constituant_principal from potion;

--2. Liste des noms des trophées rapportant 3 points. (2 lignes)
select nom_categ from categorie c  where  nb_points  = 3;

--3. Liste des villages (noms) contenant plus de 35 huttes. (4 lignes)
select nom_village from village v where nb_huttes > 35;

--4. Liste des trophées (numéros) pris en mai / juin 52. (4 lignes)
select code_cat from trophee t WHERE date_prise >= '2052-05-01' AND date_prise < '2052-07-01';

--5. Noms des habitants commençant par 'a' et contenant la lettre 'r'. (3 lignes)
select nom	from habitant h where nom like 'a%r%' or nom like 'A%r%';

--6. Numéros des habitants ayant bu les potions numéros 1, 3 ou 4. (8 lignes)
select num_hab from absorber a where num_potion in (1, 3, 4) group by num_hab;

--7. Liste des trophées : numéro, date de prise, nom de la catégorie et nom du preneur. (10lignes)
select trophee.num_trophee, trophee.date_prise, categorie.nom_categ, habitant.nom 
from trophee 
inner join categorie on trophee.code_cat = categorie.code_cat
inner join  habitant  on trophee.num_preneur = habitant.num_hab;

--8. Nom des habitants qui habitent à Aquilona. (7 lignes)
select h.nom, v.nom_village from habitant h 
inner join village v on h.num_village = v.num_village 
where v.nom_village = 'Aquilona';

--9. Nom des habitants ayant pris des trophées de catégorie Bouclier de Légat. (2 lignes)
 select h.nom, c.nom_categ from habitant h 
 inner join trophee t  on h.num_hab  = t.num_preneur 
 inner join categorie c on t.code_cat = c.code_cat 
 where c.nom_categ = 'Bouclier de Légat';

--10. Liste des potions (libellés) fabriquées par Panoramix : libellé, formule et constituantprincipal. (3 lignes)
select p.lib_potion, p.formule, p.constituant_principal
from potion p 
inner join fabriquer f on p.num_potion  = f.num_potion
join habitant h on f.num_hab  = h.num_hab 
where h.nom = 'Panoramix';

--11. Liste des potions (libellés) absorbées par Homéopatix. (2 lignes)
select distinct p.lib_potion, h.nom
from potion p 
inner join absorber a on p.num_potion = a.num_potion 
inner join habitant h on a.num_hab = h.num_hab 
where h.nom = 'Homéopatix';

--12. Liste des habitants (noms) ayant absorbé une potion fabriquée par l'habitant numéro 3. (4 lignes)
select distinct  h.nom 
from habitant h 
join absorber a on h.num_hab  = a.num_hab  
join potion p on a.num_potion = p.num_potion
join fabriquer f on p.num_potion  = f.num_potion 
where f.num_hab ='3';

--13. Liste des habitants (noms) ayant absorbé une potion fabriquée par Amnésix. (7 lignes)
SELECT DISTINCT h.nom
FROM habitant h
JOIN absorber a ON h.num_hab = a.num_hab
JOIN fabriquer f ON a.num_potion = f.num_potion
JOIN habitant h2 ON h2.num_hab = f.num_hab
WHERE h2.nom = 'Amnésix';

--14. Nom des habitants dont la qualité n'est pas renseignée. (2 lignes)
select h.nom from habitant h where num_qualite is null ;

--15. Nom des habitants ayant consommé la Potion magique n°1 (c'est le libellé de lapotion) en février 52. (3 lignes)
SELECT  h.nom 
FROM habitant h 
JOIN absorber a ON h.num_hab = a.num_hab  
JOIN potion p ON a.num_potion = p.num_potion
WHERE p.lib_potion  = 'Potion magique n°1' AND a.date_a  BETWEEN '2052-02-01' AND '2052-03-01';

--16. Nom et âge des habitants par ordre alphabétique. (22 lignes)
select h.nom, h.age 
from habitant h 
order by h.nom ;

--17. Liste des resserres classées de la plus grande à la plus petite : nom de resserre et nom du village. (3 lignes)
select r.nom_resserre, v.nom_village
from resserre r 
join village v on r.num_village = v.num_village
order by r.superficie;

--***

--18. Nombre d'habitants du village numéro 5. (4)
select count(*) as nb_hab_vill_no_5
from habitant h 
where h.num_village ='5';

--19. Nombre de points gagnés par Goudurix. (5)
select sum (c.nb_points) AS nb_pts_win
from habitant h
inner join trophee t on h.num_hab = t.num_preneur
inner join categorie c on t.code_cat = c.code_cat
where h.nom = 'Goudurix';

--20. Date de première prise de trophée. (03/04/52)
select min(date_prise) as date_prem_prise_trophee
from trophee t;

--21. Nombre de louches de Potion magique n°2 (c'est le libellé de la potion) absorbées. (19)
select sum(a.quantite) as nb_de_louches
from absorber a 
join potion p on a.num_potion = p.num_potion 
where p.lib_potion = 'Potion magique n°2';

--22. Superficie la plus grande. (895)
select max(r.superficie) as sup_la_plus_gde
from resserre r;

--***

--23. Nombre d'habitants par village (nom du village, nombre). (7 lignes)
select v.nom_village , count(h.num_hab)
from village v
left join habitant h on v.num_village = h.num_village
group by v.nom_village;

--24. Nombre de trophées par habitant (6 lignes)
select  h.nom , count(t.num_trophee) 
from habitant h
inner join trophee t on h.num_hab = t.num_preneur
group by h.num_hab, h.nom;

--25. Moyenne d'âge des habitants par province (nom de province, calcul). (3 lignes)
select p.nom_province, round(avg(h.age),2) as moy_age
from habitant h 
inner join village v on  h.num_village = v.num_village 
inner join province p on v.num_province = p.num_province 
group by p.nom_province;

--26. Nombre de potions différentes absorbées par chaque habitant (nom et nombre). (9lignes)
select h.nom, count(distinct  a.num_potion) as nb_potion
from habitant h
inner join absorber a on h.num_hab = a.num_hab
group by  h.num_hab, h.nom;

--27. Nom des habitants ayant bu plus de 2 louches de potion zen. (1 ligne)
select h.nom as oh_le_toxico
from habitant h 
join absorber a on h.num_hab = a.num_hab 
join potion p on a.num_potion = p.num_potion
where p.lib_potion = 'Potion Zen'
group by h.nom
having sum(a.quantite)>2;

--***
--28. Noms des villages dans lesquels on trouve une resserre (3 lignes)
select v.nom_village 
from village v 
join resserre r on r.num_village = v.num_village;

--29. Nom du village contenant le plus grand nombre de huttes. (Gergovie)
select v.nom_village 
from village v
where v.nb_huttes =(select max(v2.nb_huttes)from village v2);

--30. Noms des habitants ayant pris plus de trophées qu'Obélix (3 lignes).
select h.nom as best_of_le_grobelix
from habitant h
inner join trophee t on h.num_hab = t.num_preneur
where  h.nom <> 'Obélix'
group by h.nom
having count(t.num_preneur) > (
    select COUNT(t.num_preneur) 
    from trophee t 
    where num_preneur = (
        select num_hab 
        from habitant 
        where  nom = 'Obélix'));
