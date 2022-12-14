package com.project.cobell.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter @Setter
@DynamicInsert
public class CommentFeed {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "feed_id")
	private Feed feed;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	private String content;
	private Timestamp createdAt;
}
