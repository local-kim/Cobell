package com.project.cobell.service;

import com.project.cobell.dto.LoginDto;
import com.project.cobell.dto.UserDto;
import com.project.cobell.entity.User;
import com.project.cobell.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Slf4j
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private WeightService weightService;

	@Transactional
	public void join(UserDto userDto){
		// UserDto -> User entity
		ModelMapper modelMapper = new ModelMapper();
		User userEntity = modelMapper.map(userDto, User.class);

		// insert
		userRepository.save(userEntity);

		// 생성된 user_id 이용하여 weight 인서트
		weightService.insertWeight(userDto.getWeight(), userRepository.getInsertedId());
	}

	@Transactional
	public int checkEmail(String email){
		return userRepository.countByEmail(email);
	}

	@Transactional
	public UserDto login(LoginDto loginDto){
//		return userRepository.findByIdAndPassword(loginDto.getEmail(), loginDto.getPassword());

		Optional<User> u = userRepository.findByIdAndPassword(loginDto.getEmail(), loginDto.getPassword());

		if(!u.isPresent())
			return null;

		ModelMapper modelMapper = new ModelMapper();

		User user = u.get();

		UserDto userDto = modelMapper.map(user, UserDto.class);
		userDto.setPassword(null);

		// 프로필 사진이 있는 유저만
		if(user.getPhotoUser() != null){
			userDto.setPhoto(user.getPhotoUser().getFileName());
		}

		return userDto;
	}

	@Transactional
	public UserDto getUser(Long userId){
		ModelMapper modelMapper = new ModelMapper();

		User user = userRepository.findById(userId).get();
		UserDto userDto = modelMapper.map(user, UserDto.class);

		userDto.setPassword(null);

		// 프로필 사진이 있는 유저만
		if(user.getPhotoUser() != null){
			userDto.setPhoto(user.getPhotoUser().getFileName());
		}

		return userDto;
	}
}
