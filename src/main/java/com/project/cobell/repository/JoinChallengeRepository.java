package com.project.cobell.repository;

import com.project.cobell.entity.JoinChallenge;
import com.project.cobell.entity.JoinChallengeId;
import com.project.cobell.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JoinChallengeRepository extends JpaRepository<JoinChallenge, JoinChallengeId> {
//	@Query(value = "select count(*) from join_challenge where challenge_id=1")
//	public int countUser();
	@Query(value = "select u from JoinChallenge jc , User u where u.id=jc.user.id and jc.challenge.id=:challengeId and jc.status = 1 order by jc.createdAt")
	List<User> findJoinedUsers(@Param("challengeId") Long challengeId);

	@Query(value = "select count(jc) from JoinChallenge jc where jc.challenge.id=:challengeId and jc.status = 1")
	int countJoinedUsers(@Param("challengeId") Long challengeId);

	// Query Method
	int countByChallengeIdAndUserId(Long challengeId, Long userId);

	@Query(value = "update JoinChallenge jc set jc.status = :status where jc.challenge.id = :challengeId and jc.user.id = :userId")
	void updateStatus(Long challengeId, Long userId, int status);
}
