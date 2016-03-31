<?php

namespace RNR\Repository;

/**
 * @author Robin Staes <robin.staes@student.odisee.be>
 */
class MovementsRepository extends \Knp\Repository {

	/**
	 * [getTableName description]
	 * This function returns the table name
	 * @return [string] The name of the table
	 */
	public function getTableName() {
		return 'movements';
	}

	public function fetchAll() {
		return $this->db->fetchAll(
				'SELECT movements.* FROM movements');
	}

	public function deleteperson($personID) {
		$this->db->delete('movements', array('source_person_id' => $laptopID));
		return $this->db->delete('movements', array('destination_person_id' => $laptopID));

	}

	



}